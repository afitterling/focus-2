import React from 'react'
import { Header, Modal } from 'semantic-ui-react'

function ModalBasic({title, children}) {
  const [open] = React.useState(true)

  return (
    <Modal
      open={open}
    >
      <Modal.Content image>        
        <Modal.Description>
          <Header>{title}</Header>
          {children}
        </Modal.Description>
      </Modal.Content>
    </Modal>
    )
}

export default ModalBasic
