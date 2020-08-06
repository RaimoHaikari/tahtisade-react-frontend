/*
 * https://gist.github.com/gcalmettes/2e9bd0fbcb479a2f5878a89671b84753
 */
import {select, max} from "d3";

export default function donutChart() {

    // All options that should be accessible to caller
    let data = [];
    let width = 800;
    let height = 200;
    let barPadding = 1;
    let fillColor = 'steelblue';

    let updateData;
    let updateWidth;

    function chart(selection){

        selection.each(function () {

            var barSpacing = height / data.length;
            var barHeight = barSpacing - barPadding;
            var maxValue = max(data);
            var widthScale = width / maxValue;

            let dom = select(this);

            let svg = dom.append('svg')
                .attr('class', 'bar-chart')
                .attr('height', height)
                .attr('width', width);
            
            let bars = svg.selectAll('rect.display-bar')
                .data(data)
                .enter()
                .append('rect')
                    .attr('class', '.display-bar')
                    .attr('y', function (d, i) { return i * barSpacing })
                    .attr('height', barHeight)
                    .attr('x', 0)
                    .attr('width', function (d) { return d*widthScale})
                    .style('fill', fillColor);



            updateWidth = function() {
                widthScale =  width / maxValue;

                bars
                    .transition()
                    .duration(1000)
                    .attr('width', function(d) { return d*widthScale});
                
                svg
                    .transition()
                    .duration(1000)
                    .attr('width', width);

            };

            updateData = function() {

                barSpacing = height / data.length;
                barHeight = barSpacing - barPadding;
                maxValue = max(data);
                widthScale = width / maxValue;

                
                let update = svg.selectAll('rect.display-bar')
                    .data(data);

                update
                    .transition()
                    .duration(1000)
                    .attr('y', function(d, i) { return i * barSpacing; })
                    .attr('height', barHeight)
                    .attr('x', 0)
                    .attr('width', function(d) { return d * widthScale; });

                update.enter()
                    .append('rect')
                        .attr('class', 'display-bar')
                        .attr('y', function(d, i) { return i * barSpacing; })
                        .attr('height', barHeight)
                        .attr('x', 0)
                        .attr('width', 0)
                        .style('opacity', 0)
                    .transition()
                    .duration(1000)
                    .delay(function(d, i) { return (data.length - i) * 40; })
                        .attr('width', function(d) { return d * widthScale; })
                        .style('opacity', 1);

                
                update.exit()
                    .transition()
                    .duration(650)
                    .delay(function(d, i) { return (data.length - i) * 20; })
                        .style('opacity', 0)
                        .attr('height', 0)
                        .attr('x', 0)
                        .attr('width', 0)
                    .remove();

            };

            
        });

    }

    chart.data = function(value) {

        if (!arguments.length) return data;
        
        data = value;
        
        if (typeof updateData === 'function') {
            console.log("Kyllä löytyy UD")
            updateData();
        }
        
    	return chart;
	};

    chart.width = function(value) {

        if (!arguments.length) return width;

        width = value;
        
        if (typeof updateWidth === 'function') updateWidth();
        
    	return chart;

    };

    chart.height = function(value) {

        if (!arguments.length) return height;

        height = value;

        return chart;
    };

    chart.barPadding = function(value) {

        if (!arguments.length) return barPadding;

        barPadding = value;

        return chart;
    };

    chart.fillColor = function(value) {

        if (!arguments.length) return fillColor;

        fillColor = value;

        return chart;
    };

    return chart;
    
}

