/*
 * A static, reusable donut chart for D3.js v4.
 * https://bl.ocks.org/mbhall88/b2504f8f3e384de4ff2b9dfa60f325e2
 */

import {select} from "d3";

class D3Donut {

    containerEl;
    props;
    svg;

    margin = {top: 10, right: 10, bottom: 10, left: 10};

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

        const {margin} = this;

        /*
         * append the svg object to the selection
         */
        this.svg = select(containerEl)
            .append('svg')
                .attr('class', 'D3-donut-svg')
				.attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
                .attr("width", "100%")
			.append('g')
				.attr('transform', `translate(${width / 2},${height / 2})`);


    }

}


export default D3Donut;