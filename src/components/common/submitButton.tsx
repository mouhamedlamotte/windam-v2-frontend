import React from 'react'
import { Button } from '../ui/button'
import { Loader } from 'lucide-react'

type SubmitButtonProps = {
    title? : string,
    isLoading : boolean
}
const SubmitButton = ({...props}:SubmitButtonProps) => {
  return (
    <Button className="w-full" type="submit" disabled={props.isLoading}>
    {props.isLoading ? (
      <Loader className="animate-spin text-foreground" />
    ) : (
      props.title
    )}
  </Button>
  )
}

export default SubmitButton