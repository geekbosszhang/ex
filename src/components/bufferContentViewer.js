// JS
import React from 'react';

export default class BufferContentViewer extends React.Component {
    constructor(props) {
        super(props);
        this.firstTop = true;
        this.pixelsPerByteWidth = Math.floor(Number(props.canvasOptions.width) / props.bytesPerRow);
        this.pixelsPerByteHeigth = Math.floor(Number(this.props.canvasOptions.heigth) / (props.pageSize / props.bytesPerRow));
    }

    mapLengthToXY(length) {
        let result = {};
        result.y = Math.floor(length / this.props.bytesPerRow);
        result.x = length % this.props.bytesPerRow;
        return result;
    }

    getDrawStartandEnd(length, step) {
        let startXY = this.mapLengthToXY(length), endXY = this.mapLengthToXY(length + step);
        return {startXY, endXY};
    }

    drawLine(sxy, exy, index) {
        this.ctx.fillStyle = this.props.blockColorPool[index % this.props.blockColorPool.length];
        this.ctx.fillRect(sxy.x * this.pixelsPerByteWidth, sxy.y * this.pixelsPerByteHeigth, (exy.x - sxy.x) * this.pixelsPerByteWidth, this.pixelsPerByteHeigth);
    }

    drawText(text, x, y, textRotate) {
        this.ctx.strokeStyle = this.props.textColor;
        if (textRotate) {
            this.ctx.rotate(Math.PI);
            this.ctx.strokeText(text, -x, -y);
            this.ctx.rotate(Math.PI);
        } else {
            this.ctx.strokeText(text, x, y);
        }
    }

    drawBlock(startXY, endXY, rowsN, index, textRotate) {
        if (this.firstTop) {
            this.firstTop = false;
        } else {
            this.ctx.translate( Number(this.props.canvasOptions.width), Number(this.props.canvasOptions.heigth));
            this.ctx.rotate(Math.PI);
        }
        if (rowsN) {
            this.drawLine(startXY, {x: this.props.bytesPerRow, y: startXY.y}, index);
            for (let i = 0; i < rowsN - 1; i++) {
                this.drawLine({x: 0, y: startXY.y + i + 1}, {x: this.props.bytesPerRow, y: startXY.y + i + 1}, index);
                if (i === 0) {
                    this.drawText(index + 1, (this.props.bytesPerRow / 2) * this.pixelsPerByteWidth, (startXY.y + 1) * this.pixelsPerByteHeigth + this.props.strokeTextDeltaHeigth, textRotate);
                }
            }
            this.drawLine({x: 0, y: endXY.y}, endXY, index);
            let topLength = this.props.bytesPerRow - startXY.x, bottomLength = endXY.x;
            if (rowsN === 1 && topLength > bottomLength) {
                this.drawText(index + 1, (startXY.x + (this.props.bytesPerRow - startXY.x) / 2) * this.pixelsPerByteWidth, startXY.y * this.pixelsPerByteHeigth + this.props.strokeTextDeltaHeigth, textRotate);
            } else if (rowsN === 1) {
                this.drawText(index + 1, endXY.x / 2 * this.pixelsPerByteWidth, endXY.y * this.pixelsPerByteHeigth + this.props.strokeTextDeltaHeigth, textRotate);
            }

        } else {
            this.drawLine(startXY, endXY, index);
            this.drawText(index + 1, (startXY.x + (endXY.x - startXY.x) / 2) * this.pixelsPerByteWidth, endXY.y * this.pixelsPerByteHeigth + this.props.strokeTextDeltaHeigth, textRotate);
        }
    }


    draw(data) {
        let drawedLength = 0;
        let drawedLength2 = 0;
        data.forEach((item, index) => {
            let startXY = this.getDrawStartandEnd(drawedLength, item.length).startXY;
        let endXY = this.getDrawStartandEnd(drawedLength, item.length).endXY;
        let rowsN = endXY.y - startXY.y;

        let startXY2 = this.getDrawStartandEnd(drawedLength2, item.tuple.length).startXY;
        let endXY2 = this.getDrawStartandEnd(drawedLength2, item.tuple.length).endXY;
        let rowsN2 = endXY2.y - startXY2.y;

        this.drawBlock(startXY, endXY, rowsN, index, false);
        this.drawBlock(startXY2, endXY2, rowsN2, index, true);

        drawedLength += item.length;
        drawedLength2 += item.tuple.length;

    });
    }

    renderBufferViewer() {
        this.ctx = document.getElementById('buffer-viewer-canvas').getContext('2d');
        this.draw(this.props.data);
    }

    componentDidMount() {
        this.renderBufferViewer();
    }

    render() {
        return (<canvas id="buffer-viewer-canvas" width={this.props.canvasOptions.width} height={this.props.canvasOptions.heigth}/>);
    }
}
BufferContentViewer.propTypes = {
    canvasOptions: React.PropTypes.shape({
        width: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
        heigth: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number])
    }),
    blockColorPool: React.PropTypes.arrayOf(React.PropTypes.string),
    textColor: React.PropTypes.string,
    bytesPerRow: React.PropTypes.number,
    strokeTextDeltaHeigth: React.PropTypes.number,
    pageSize: React.PropTypes.number,
    data: React.PropTypes.arrayOf(React.PropTypes.object)
};

BufferContentViewer.defaultProps = {
    canvasOptions: {
        width: 1024,
        heigth: 640
    },
    blockColorPool: ['#F2242F', '#8AE622', '#229BE6', '#8d8e8e', '#E6B822', '#1FCCC0'],
    textColor: '#FFD9DB',
    bytesPerRow: 256,
    strokeTextDeltaHeigth: 10,
    pageSize: 8192,
    data: []
};

