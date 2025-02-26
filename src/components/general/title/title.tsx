import './title.scss'

const Heading = ({text} : {text: string}) => {
  return (
    <h2 className='heading'>
      {text}
    </h2>
  )
}

export default Heading
