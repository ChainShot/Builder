import React, {Component} from 'react';
import SVG from '../../../SVG';
import './CompilationDisplay.scss';

class CompilationDisplay extends Component {
  render() {
    const {output, compile, toggleAuto} = this.props;
    if(output) {
      const { errors } = output;
      const warnings = output.warnings || [];
      if(errors.length + warnings.length === 0) {
        return (
          <div className="compilation-message">
            <SVG name="check" />
            Compilation Successful. No errors.
          </div>
        )
      }
      else {
        return (
            <div className="compilation-errors">
                <ul>
                    {
                        (errors || []).map((error) => {
                            return (
                                <li className="error" key={error.message}>
                                    <pre>{error.formattedMessage}</pre>
                                </li>
                            );
                        })
                    }
                    {
                        (warnings || []).map((warning) => {
                            return (
                                <li className="warning" key={warning.message}>
                                    <pre>{warning.formattedMessage}</pre>
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
