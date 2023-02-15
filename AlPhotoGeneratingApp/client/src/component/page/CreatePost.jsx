import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { preview } from '../../assets'
import { getRandomPrompt } from '../../utils/index'
import  FormField  from "../FormField"

const CreatePost = () => {
  const navigate = useNavigate();
  const [ form , setForm ] = useState({
    name: '',
    prompt: '',
    photo: '',

  })

  const [ generatingImg , setGereratingImg ] = useState(false)
  const [ loading , setLoading ] = useState(false)

  const handleSubmit = () => {
    return "yeah"
  }
  const handleChange = (e) => {
    return "yeah"
  }
 const handleSurpriseMe = () =>{

 }
  return (
    <section className='max-w-7wi mx-auto'>
      <div >
          <h1 className='font-extrabold text-[#222328] text-[32px]'>Create</h1>
          <p className='mt-2 text-[#666e75] text-[14px]
          max-w-[500px]
          '>Create imaginative and visually stunning generated by Dall-E Ai and share them with your wife community </p>
      </div>
      <form className='mt-16 max-w-3xl' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-5'>
          <FormField 
          labelName="Your name"
          name="name"
          placeholder="Moomy"
          value={form.name}
          handleChange={handleChange}
          />
          <FormField 
          labelName="Prompt"
          type="text"
          name="prompt"
          placeholder="a macro 35mm photograph of two mice in Hawaii"
          value={form.prompt}
          handleChange={handleChange}
          isSurpriseme={null}
          handleSurpriseMe={handleSurpriseMe}
          />
        </div> 
      </form>
    </section>
  )
}

export default CreatePost