import React, {Component} from 'react';
import axios from 'axios';
import { PUBLIC_URL } from '../config';

let _svgCache = {};

class SVG extends Component {
    constructor(props) {
        super(props)
        this.state = {
            svgEl: null,
            source: null
        }
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
    }

    retrieveSVG() {
        let {name} = this.props;
        if (name) {
            let cached = _svgCache[name];
            if (cached) {
                this.setState({svgEl: cached});
            }
            else {
                let CancelToken = axios.CancelToken;
                let source = CancelToken.source();
                axios({
                    type: 'GET',
                    url: `${PUBLIC_URL}${name}.svg`,
                    cancelToken: source.token,
                    dataType: 'xml'
                }).then(({ data }) => {
                    if (data) {
                        _svgCache[name] = data;
                        this.setState({svgEl: data})
                    }
                })
                this.setState({source});
            }
        }
    }

    componentWillUnmount() {
        let {source} = this.state;
        if (source) source.cancel()
    }

    componentDidUpdate(prevProps) {
        let props = this.props;
        if (props.name !== prevProps.name) {
            this.retrieveSVG()
        }
    }

    componentDidMount() {
        this.retrieveSVG();
    }

    render() {
        let {svgEl} = this.state;
        if(!svgEl) return null;
        let {className, onClick, ...otherProps} = this.props;
        let classes = [className, 'svg-container'].join(' ');
        let createMarkup = () => ({__html: svgEl ? svgEl : `<svg />`})
        return <div className={classes} onClick={onClick} dangerouslySetInnerHTML={ createMarkup() } {...otherProps}></div>
    }
}

export default SVG;
