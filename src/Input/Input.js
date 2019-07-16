import React from 'react';
import {FormGroup,Label} from 'reactstrap';
import InputB from 'reactstrap/lib/Input';

class Input extends React.Component{

    render() {
        return (
        <FormGroup>
            {
                this.props.children ?
                <Label>{this.props.children}</Label>:null
            }
            <InputB id={this.props.id} placeholder={this.props.hint} type={this.props.typ} 
                value={this.props.val} onChange={this.props.change}/>
        </FormGroup>
        );
    }
}

export default Input;