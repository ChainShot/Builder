import React, {Component} from 'react';
import SVG from '../../SVG';
import './CompilationDisplay.scss';

class CompilationDisplay extends Component {
  render() {
    const {output, compile, toggleAuto} = this.props;
    if(output) {
      const { errors, warnings } = output;
      if(errors.length + warnings.length === 0) {
        return (
          <div className="compilation-message"> Compilation Successful. No errors. </div>
        )
      }
      else {
        return (
            <div className="compilation-errors">
                <ul>
                    {
                        (errors || []).map((error) => {
                            return (
                                <li className="error" key={error}>
                                    <pre>{error}</pre>
                                </li>
                            );
                        })
                    }
                    {
                        (warnings || []).map((warnings) => {
                            return (
                                <li className="warning" key={warnings}>
                                    <pre>{warnings}</pre>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        );
      }
    }
    return (
      <div className="compilation-message">
        No Compilation to Display. To compile click
        <SVG name="code" onClick={compile}/> or toggle
        <SVG name="magic" onClick={toggleAuto}/> for automatic compilation.
      </div>
    )
  }
}

export default CompilationDisplay;
