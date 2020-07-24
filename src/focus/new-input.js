import React from 'react'
import { Button, Form } from 'semantic-ui-react'

export const NewInput = ({onAdd}) => {
    const form = {title: '', desc: ''};

    const onSubmit = () => {
        console.log(form);
        onAdd(form);
    }

    const onChange = (field) => {
        return (e) => {
            form[field] = e.target.value;
        };    
    }

    return (
        <Form onSubmit={onSubmit}>
          <Form.Field>
            <label>Title</label>
            <input placeholder='name' onChange={onChange('title')} />
          </Form.Field>
          <Form.Field>
            <label>Description</label>
            <input placeholder='description' onChange={onChange('desc')} />
          </Form.Field>
          <Button type='submit'>Submit</Button>
        </Form>
      );
}


