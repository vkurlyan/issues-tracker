import React, {PropTypes} from 'react'
import { FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap'
import './HomeView.scss'

export const HomeView = React.createClass({

    getValidationState() {
        if (this.props.validationMessage) {
            return 'error'
        }
    },

    tokenRef(input) {
        this.textInput = input;
    },

    onSubmit(e) {
        e.preventDefault();
        console.log(this.textInput.value);
        this.props.submitToken(this.textInput.value)
    },

    render() {
        const {validationMessage} = this.props;

        return (
            <div>
                <h1 className="text-center">GitHub issues tracker</h1>
                <form
                    onSubmit={this.onSubmit}
                >
                    <FormGroup
                        validationState={this.getValidationState()}
                    >
                        <ControlLabel>Please enter a GitHub API token</ControlLabel>
                        <FormControl
                            required="required"
                            type="text"
                            placeholder="Token"
                            inputRef={this.tokenRef}
                        />
                        <FormControl.Feedback />
                        <HelpBlock>You can generate the token&nbsp;
                            <a
                                href="https://github.com/settings/tokens"
                                target="_blank">
                                here
                            </a>
                        </HelpBlock>
                        {validationMessage && <div className="validation_error">{validationMessage}</div>}
                    </FormGroup>
                    <FormGroup>
                        <Button type="submit">
                            Submit
                        </Button>
                    </FormGroup>
                </form>
            </div>
        )
    }
})

HomeView.propTypes = {
    token : PropTypes.string,
    validationMessage : PropTypes.string,
    submitToken : PropTypes.func.isRequired,
}

export default HomeView
