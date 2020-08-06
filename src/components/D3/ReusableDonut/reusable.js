/*
 * https://gist.github.com/gcalmettes/2e9bd0fbcb479a2f5878a89671b84753
 */
import {select, max} from "d3";

class D3BarChart {

    containerEl;
    props;
    svg;

    barPadding = 2;
    fillColor = "navy";

    constructor(containerEl, props) {

        console.log(" ..........   A L U S T E T A A N  ...............")

        this.containerEl = containerEl;
        this.props = props;

        const {width, height} = props;

        this.svg = select(containerEl)
            .append('svg')
                .attr('class', 'D3-bc-svg')
                .attr('width', width)
                .attr('height', height)

        this.drawDataPoints();
    }

    drawDataPoints = () => {

        const {svg, 
            props: {data, width, height}, 
            barPadding, 
            fillColor
        } = this;

        let barSpacing = height / data.length;
        let barHeight = barSpacing - barPadding;
        let maxValue = max(data);
        let widthScale = width / maxValue;

        let bars = svg.selectAll('rect.display-bar')
            .data(data)

        bars
            .enter()
            .append('rect')
                .attr('class', 'display-bar')
                .attr('y', function (d, i) { return i * barSpacing })
                .attr('height', barHeight)
                .attr('x', 0)
                .attr('width', function (d) { return d*widthScale})
                .style('fill', fillColor);  
                
    }

    updateData = (newData) => {

        const {svg, 
            props: {width, height}, 
            barPadding, 
            fillColor
        } = this;

        let barSpacing = height / newData.length;
        let barHeight = barSpacing - barPadding;
        let maxValue = max(newData);
        let widthScale = width / maxValue;


        let update = this.svg.selectAll('rect.display-bar')
            .data(newData);

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
            .delay(function(d, i) { return (newData.length - i) * 40; })
                .attr('width', function(d) { return d * widthScale; })
                .style('opacity', 1);

      
        update.exit()
            .transition()
            .duration(650)
            .delay(function(d, i) { return (newData.length - i) * 20; })
                .style('opacity', 0)
                .attr('height', 0)
                .attr('x', 0)
                .attr('width', 0)
            .remove();

            
    }

}


export default D3BarChart;