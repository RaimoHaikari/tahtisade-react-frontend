/*
 * A static, reusable donut chart for D3.js v4.
 * https://bl.ocks.org/mbhall88/b2504f8f3e384de4ff2b9dfa60f325e2
 */

import {arc, format, pie, scaleOrdinal, schemeAccent, select, selectAll} from "d3";

class D3Donut {

    containerEl;
    props;
    svg;

    
    colour = scaleOrdinal(schemeAccent); // colour scheme
    floatFormat = format('.4r');
    percentFormat = format(',.2%');

    margin = {top: 10, right: 10, bottom: 10, left: 10};

    /*
	 * Calculates the angle for the middle of a slice
	 */
	midAngle = (d) => {
		return d.startAngle + (d.endAngle - d.startAngle) / 2;
    }
    
	/*
	 * function to create the HTML string for the tool tip. Loops through each key in data object
	 * and returns the html string key: value
	 */
	toolTipHTML = (data) => {
		
		const {percentFormat} = this;

		var tip = '',
			i   = 0;

		for (var key in data.data) {

			// if value is a number, format it as a percentage
			var value = (!isNaN(parseFloat(data.data[key]))) ? percentFormat(data.data[key]) : data.data[key];

			// leave off 'dy' attr for first tspan so the 'dy' attr on text element works. The 'dy' attr on
			// tspan effectively imitates a line break.
			if (i === 0) tip += '<tspan x="0">' + key + ': ' + value + '</tspan>';
			else tip += '<tspan x="0" dy="1.2em">' + key + ': ' + value + '</tspan>';
			i++;
		}

		return tip;
    }
    
	
	/*
	 * function that creates and adds the tool tip to a selected element
	 */
	toolTip = (selection) => {
		
		
        const {colour, radius, svg, toolTipHTML} = this;
        
        let category = 'Species';

		// add tooltip (svg circle element) when mouse enters label or slice
		selection.on('mouseenter', function (data) {
			
			svg.append('text')
				.attr('class', 'toolCircle')
				.attr('dy', -15) // hard-coded. can adjust this to adjust text vertical alignment in tooltip
				.html(toolTipHTML(data)) // add text to the circle.
				.style('font-size', '.9em')
				.style('text-anchor', 'middle'); // centres text in tooltip

			svg.append('circle')
				.attr('class', 'toolCircle')
				.attr('r', radius * 0.55) // radius of tooltip circle
				.style('fill', colour(data.data[category])) // colour based on category mouse is over
				.style('fill-opacity', 0.35);
				

		});

		// remove the tooltip when mouse leaves the slice/label
		selection.on('mouseout', function () {
			selectAll('.toolCircle').remove();
		});
	}
	

    constructor(containerEl, props) {
        console.log(" ......... -  A L U S T E T A A N  - ...............");

		this.containerEl = containerEl;
        this.props = props;

        const {
            category,
            cornerRadius,
			data,
			height, 
			padAngle,
			variable,
			width
        } = props;

        const {colour, floatFormat, margin, percentFormat} = this;
        const {midAngle, toolTip} = this;

        const radius = Math.min((width + margin.left + margin.right), (height + margin.top + margin.bottom)) / 2;
        this.radius = radius;

        // creates a new pie generator
        let aPie = pie()
            .value(function(d) { return floatFormat(d[variable]); })

        /*
		 * Contructs and arc generator. 
		 * This will be used for the donut. The difference between outer and inner
		 * radius will dictate the thickness of the donut
		 */
		let anArc = arc()
            .outerRadius(radius * 0.8)
            .innerRadius(radius * 0.6)
            .cornerRadius(cornerRadius)
            .padAngle(padAngle);

        /*
		 * this arc is used for aligning the text labels
		 */
		let outerArc = arc()
            .outerRadius(radius * 0.9)
            .innerRadius(radius * 0.9);
        
        

        /*
         * append the svg object to the selection
         */
        this.svg = select(containerEl)
            .append('svg')
                .attr('class', 'D3-donut-svg')
                //.attr('width', width + margin.left + margin.right)
                //.attr('height', height + margin.top + margin.bottom)
				.attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
                .attr("width", "100%")
			.append('g')
                .attr('transform', `translate(${(width + margin.left + margin.right) / 2},${(height + margin.top + margin.bottom) / 2})`);
                
        /* 
		 * g elements to keep elements within svg modular
		 */
		this.svg.append('g').attr('class', 'slices');
		this.svg.append('g').attr('class', 'labelName');
        this.svg.append('g').attr('class', 'lines');
        
		/* 
		 * add and colour the donut slices
		 */
		let path = this.svg.select('.slices')
			.datum(data)
			.selectAll('path')
			.data(aPie)
			.enter()
			.append('path')
                //.attr('fill', function(d) { return colour(d.data[category]); })
				.attr('fill', function(d) { 
				
					return colour(d.data[category]);
				})
                .attr('d', anArc);
		/*
		 * add text labels
		 */
        let label = this.svg.select('.labelName')
            .datum(data)
            .selectAll('text')
            .data(aPie)
            .enter()
            .append('text')
                .attr('dy', '.35em')
                .html(function(d) {
                    // add "key: value" for given category. Number inside tspan is bolded in stylesheet.
                    return d.data[category] + ': <tspan>' + percentFormat(d.data[variable]) + '</tspan>';
                })
                .attr('transform', function(d) {

                    // effectively computes the centre of the slice.
                    // see https://github.com/d3/d3-shape/blob/master/README.md#arc_centroid
                    var pos = outerArc.centroid(d);

                    // changes the point to be on left or right depending on where label is.
                    pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1);
                    return 'translate(' + pos + ')';
                })
                .style('text-anchor', function(d) {
                    // if slice centre is on the left, anchor text to start, otherwise anchor to end
                    return (midAngle(d)) < Math.PI ? 'start' : 'end';
                });

        /*
		 * add lines connecting labels to slice. A polyline creates straight lines connecting several points
		 */
		 let polyline = this.svg.select('.lines')
            .datum(data)
            .selectAll('polyline')
            .data(aPie)
            .enter().append('polyline')
             .attr('points', function(d) {

                 // see label transform function for explanations of these three lines.
                 var pos = outerArc.centroid(d);
                 pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1);
                 return [anArc.centroid(d), outerArc.centroid(d), pos]
             });

        /* 
		 * add tooltip to mouse events on slices and labels
		 */
		selectAll('.labelName text, .slices path').call(toolTip);


    }

}


export default D3Donut;