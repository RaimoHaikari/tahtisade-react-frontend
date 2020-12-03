import * as d3 from 'd3'

/*
 * https://bl.ocks.org/mbhall88/22f91dc6c9509b709defde9dc29c63f2

 * React Hooks and D3
 * https://www.toptal.com/d3-js/towards-reusable-d3-js-charts
 * https://medium.com/@stopyransky/react-hooks-and-d3-39be1d900fb
 */

export const updateableDonutChart = () => {

    // All options that should be accessible to caller
    let data = []
    let width = 500;
    let height = 500;
    let margin = {top: 10, right: 10, bottom: 10, left: 10}

    /*
    let colour = d3.scaleOrdinal(
        d3.schemeCategory10
    )
    */

    let colour;

    /*
	.domain(myData)
	.range(['black', '#ccc', '#ccc']);

    */

    let variable; // osuudet määrävän muuttujan nimi
    let category;
    
    let transTime;

    let padAngle;

    let cornerRadius;

    /*
     * Piirakkaan / D3 liittyvät
     */
    let arc;
    let pie;
    let outerArc;
    let radius;

    /*
     * Grafiikkaan liittyvä
     */
    let svg;
    let path;


    /*
     * päivitysfunktiot
     */
    let updateCategory;
    let updateCornerRadius;
    let updateData;
    let updateHeight;
    let updatePadAngle;
    let updateTransTime;
    let updateVariable;
    let updateWidth;

    /*
     * Yhteys ulkomaailmaan
     * - onko joku ryhmä aktivoitu hiirellä
     */
    let emphasizedSector = null;
    let callBack;

    /*
     * sisäiseen käyttöön tarkoitetut funktiot
     */

    // function to calculate the tween for an arc's transition.
    // see http://bl.ocks.org/mbostock/5100636 for a thorough explanation.
    function arcTween(d) {

        let i = d3.interpolate(d.oldValue, d);

        return function(t) { 
            return arc(i(t)); 
        };
    }

    function findNeighborArc(i, data0, data1, key) {
        var d;
        return (d = findPreceding(i, data0, data1, key)) ? {startAngle: d.endAngle, endAngle: d.endAngle}
            : (d = findFollowing(i, data0, data1, key)) ? {startAngle: d.startAngle, endAngle: d.startAngle}
                : null;
    }

    // Find the element in data0 that joins the highest preceding element in data1.
    function findPreceding(i, data0, data1, key) {
        var m = data0.length;
        while (--i >= 0) {
            var k = key(data1[i]);
            for (var j = 0; j < m; ++j) {
                if (key(data0[j]) === k) return data0[j];
            }
        }
    }

    // Find the element in data0 that joins the lowest following element in data1.
    function findFollowing(i, data0, data1, key) {
        var n = data1.length, m = data0.length;
        while (++i < n) {
            var k = key(data1[i]);
            for (var j = 0; j < m; ++j) {
                if (key(data0[j]) === k) return data0[j];
            }
        }
    }

    function key(d) {
        return d.data[category];
    }

    /*
     * Donitsin keskellä esitettävän Tooltip:in aktivointi ja esittäminen.
     * - aktivointi tapahtuu viemällä hiiri jonkin kolmesta sektorista ylle
     */
    function toolTip(selection) {

        // add tooltip (svg circle element) when mouse enters label or slice
        selection.on('mouseenter', function (event, d) {

            d3.selectAll('.slices path').each(
                function(obj){
                    d3
                        .select(this)
                        .classed(obj.index === d.index?"opacityPlus":"opacityMinus", true)
                        .classed("opacityNeutral", false)
                }
            ) 
            
            svg.append('text')
                .attr('class', 'toolCircle')
                .attr('dy', -15) // hard-coded. can adjust this to adjust text vertical alignment in tooltip
                .html(toolTipHTML(d)) // add text to the circle.
                .style('font-size', '.9em')
                .style('text-anchor', 'middle'); // centres text in tooltip
        
            svg.append('circle')
                .attr('class', 'toolCircle')
                .attr('r', radius * 0.55) // radius of tooltip circle
                .style('fill', colour(d.data[category])) // colour based on category mouse is over
                .style('fill-opacity', 0.35);
                
        });

        /*
         * - poistetaan donitsin keskellä näkyvä tooltip-teksi
         */
        selection.on('mouseout', function (event, d) {

            d3.selectAll('.slices path').each(
                function(obj){
                    d3
                        .select(this)
                        .classed("opacityPlus", false)
                        .classed("opacityMinus", false)
                        //.classed(obj.index === d.index?"opacityPlus":"opacityMinus", true)
                        .classed("opacityNeutral", true)
                }
            ) 

            d3.selectAll('.toolCircle').remove();


        });

        selection.on('click', (event, d) => {

            let val = []

            if(emphasizedSector === null) {
                emphasizedSector = d.data
                val = d.data.ids
            } else {
                emphasizedSector = null
            }

            // Välitetään react-komponenttiin tieto
            callBack(val)
        })
    }


    /*
     * Donitsin keskellä sijaitsevan palleron teksti
     */
    function toolTipHTML(data) {

        let tip = `
            <tspan x="0">${data.data.val}</tspan>
            <tspan x="0" dy="1em">${data.data.lkm}</tspan>
        `

        return tip;
    }




    function chart(selection){

        selection.each(function (){

            radius = Math.min(width, height) / 2;

            colour = d3.scaleOrdinal()
                .domain(data)
                .range(['red', 'green', 'blue']);


            /*
             * kuinka aineistosta saadaan piirakka
             */
            pie = d3
                .pie()
                .value(function(d) { return d[variable]})
                .sort(null)

            /*
             * kuinka piirakasta saadaan donitsi
             *
             * Contructs and arc generator.
             * This will be used for the donut. The difference between outer and inner
             * radius will dictate the thickness of the donut
             */
            arc = d3.arc()
                .outerRadius(radius * 0.8)
                .innerRadius(radius * 0.6)
                .cornerRadius(cornerRadius)
                .padAngle(padAngle)

            /*
             * otsikkotekstien asemointi
             */
            outerArc = d3.arc()
                .outerRadius(radius * 0.9)
                .innerRadius(radius * 0.9)     
                
            /*
             * Grafiikan toteutus
             */
            svg = d3
                .select(this)
                .append('svg')
                    //.attr('width', width + margin.left + margin.right)
                    //.attr('height', height + margin.top + margin.bottom)
                    .attr("viewBox", [0,0, width + margin.left + margin.right, height + margin.top + margin.bottom])
                .append('g')
                    .attr('transform', `translate(${width/2},${height/2})`)
            
            svg.append('g').attr('class','slices')

            // - lisätään ja väritetään viipaleet
            path = svg
                .select('.slices')
                //.datum(data)
                .selectAll('path')
                .data(pie(data))
                .enter()
                .append('path')
                    .attr('fill', function(d) {
                        return colour(d.data[category])
                    })
                    .attr('class','opacityNeutral')
                    .attr('d', arc)

            /*
             * Kytketään donitsin osiin tapahtumat:
             * - hover, click
             */
            d3.selectAll('.slices path').call(toolTip);


            /*
             * update -functions
             * - functions leverage D3.js transitions and update patterns 
             *   to smoothly make any necessary changes based on new data 
             *   or chart configurations
             */
            updateCategory = function() {}

            updateCornerRadius = function() {}

            updateData = function() {

                console.log("P Ä I V I T E T Ä Ä N")

                let updatePath = d3.select('.slices').selectAll('path')

                /*
                 * Nollataan mahdollinen ryhmän aktivointi
                 */
                emphasizedSector = null
                /*
                 * Luetaan muuttujiin vallitseva ja tuleva tilanne.
                 * - uuden aineiston objekteihin liitetään mukaan objektien
                 *   vanhoiksi käyvät arvot, jotta siirtymäanimaatio
                 *   saadaan laskettua
                 */
                let data0 = path.data() 
                let data1 = pie(data)
                        .map((d,i) => {
                        return {
                            ...d,
                            oldValue: data0[i]
                        }
                    })

                updatePath = updatePath.data(data1, key)

                /*
                 * todo: voisi poistaa, datan koko pysyy aina samana
                 */
                updatePath
                    .enter()
                    .append('path')
                    .each(function(d, i) { 
                            const x = findNeighborArc(i, data0, data1, key) || d; 
                            this._current = x
                        })
                        .attr('fill', function(d) {  return colour(d.data[category]); })
                        .attr('d', arc);


                // removes slices/labels/lines that are not in the current dataset
                updatePath.exit()
                    .transition()
                    .duration(transTime)
                    .attrTween("d", arcTween)
                    .remove();

                // animates the transition from old angle to new angle for slices/lines/labels
                updatePath
                    .transition()
                    .duration(transTime)
                        .attrTween('d', arcTween)

            }

            updateHeight = function() {}

            updatePadAngle = function() {}

            updateTransTime= function() {}

            updateVariable = function() {}

            updateWidth = function() {
                console.log("ajetaan updateWidth")
            }

        })
    }

    /*
     * getter & setter -funktiot, joissa voidaan huomioida, ollaanko 
     * päivittämässä jo olevaa graafia vai syöttämässä lähtötietoja
     * 
     * - To make these accessible to the caller, 
     *   functions are added as properties to the chart. 
     */ 
    chart.category = function(value) {

        if (!arguments.length) return category;

        category = value;

        if(typeof updateCategory === 'function')
            updateCategory();

        return chart;
    };

    chart.cornerRadius = function(value) {

        if (!arguments.length) return cornerRadius;

        cornerRadius = value;

        if(typeof updateCornerRadius === 'function')
            updateCornerRadius();

        return chart;
    };

    chart.data = function(value) {

        if (!arguments.length) return data;

        data = value;

        if(typeof updateData === 'function')
            updateData();

        return chart;
    };

	chart.height = function(value) {

        if (!arguments.length) return height;
        
        height = value;
        
        if (typeof updateHeight === 'function') 
            updateHeight();

    	return chart;
    };

	chart.padAngle = function(value) {

        if (!arguments.length) return padAngle;
        
        padAngle = value;
        
        if (typeof updatePadAngle === 'function') 
            updatePadAngle();

    	return chart;
    };

    //transTime
	chart.transTime = function(value) {

        if (!arguments.length) return transTime;
        
        transTime = value;
        
        if (typeof updateTransTime === 'function') 
            updateTransTime();

    	return chart;
    };

    chart.variable = function(value) {

        if (!arguments.length) return variable;

        variable = value;

        if(typeof updateVariable === 'function')
            updateVariable();

        return chart;
    };


	chart.width = function(value) {

        if (!arguments.length) return width;
        
        width = value;
        
        if (typeof updateWidth === 'function') 
            updateWidth();

    	return chart;
    };

    /*
     * callBack
     */
    chart.callBack = function(value){
        callBack = value;

        return chart;
    }
    
    return chart;

}