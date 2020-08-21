import React from 'react';
import { Form } from 'semantic-ui-react';
import { connect } from 'react-redux';

class Settings extends React.Component {

    /*
        email / to redux
        userId / to redux
    */
    constructor(props){
        super(props);
        this.dispatch = this.props.dispatch;
        console.log('settings', props);
        this.state = {email: ''}
    }

    componentDidMount(){
        this.setState({email: JSON.parse(localStorage.getItem('email'))});
    }

    onEmailChange = (e) => {
        this.setState({email: e.target.value})
        localStorage.setItem('email', JSON.stringify(e.target.value));
    }

    dataUri = 'data:application/json;charset=utf-8,' + this.exportToJsonFile(this.props.items);

    exportToJsonFile(jsonData) {
        let dataStr = JSON.stringify(jsonData);
        return encodeURIComponent(dataStr);
    }

    onFileUpload = (e) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const items = e.target.result;
            console.log(items);
            localStorage.setItem('items', JSON.stringify(items));
            window.location.reload();
        }
        reader.readAsText(e.target.files[0]);
        console.log(e.target.files[0]);
    }

    //reader.onload = handleFileRead;

    render() {
        return (
            <React.Fragment>
                <Form>
                    <Form.Field>
                        <label>UserId</label>
                        <input value={this.props.userId} onChange={()=>{}} disabled={false} />
                    </Form.Field>
                    <Form.Field>
                        <label>E-Mail</label>
                        <input value={this.state.email} onChange={this.onEmailChange} disabled={false} />
                    </Form.Field>
                </Form>
                <h2>Download</h2>
                <a download="focus2.json" href={this.dataUri}>data.json</a>
                <h2>Import</h2>
                <input onChange={this.onFileUpload} type="file" name="files[]" id="fileUpload"></input>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({ items: state.items, userId: state.userId });

/*const mapDispatchToProps = {
  addItem
}*/

export default connect(
  mapStateToProps,
  //mapDispatchToProps
)(Settings);
