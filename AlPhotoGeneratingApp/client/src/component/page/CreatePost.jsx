import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { preview } from '../../assets'
import { getRandomPrompt } from '../../utils/index'
import {FormField, Loader , Salty} from '../index'


const CreatePost = () => {
  const navigate = useNavigate();
  const [ form , setForm ] = useState({
    name: '',
    prompt: '',
    photo: '',

  })

  const [ generatingImg , setGereratingImg ] = useState(false)
  const [ loading , setLoading ] = useState(false)

  const generateImage = async () => {
    if(form.prompt){
      try {
        setGereratingImg(true);
        const response = await fetch('http://localhost:8080/api/v1/dalle',{
          method: 'POST',
          headers: {
            'Content-Type':'application/json',
          },
          body: JSON.stringify({prompt: form.prompt }),
        })
        const data = await response.json();

        setForm({...form, photo: `data:image/jpeg;base64,${data.photo}`})
        
      } catch (error) {
        alert(error)
        console.log(error)
      } finally {
        setGereratingImg(false)
      }
    } else{
      alert('Enter a prompt dummy ')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // checcking if the form if data exist
    if(form.prompt && form.photo){
      setLoading(true);
      // fetcing the post from the other post 
      try {
        const response = await fetch('http://localhost:8080/api/v1/post',{
          method:'POST',
          headers:{
            'Content-Type':'application/json',
          },
          body: JSON.stringify(form)
        })

        await response.json();
        navigate('/');
      } catch (error) {
        alert(error)
        
      } finally{
         setLoading(false)
      }
    } else {
      alert("Add a img dummy or else we cant generate own our own :/")
    }
  }

  const handleChange = (e) => {
    setForm({...form,[e.target.name]:e.target.value})
  }
 const handleSurpriseMe = () =>{
  const randomPrompt = getRandomPrompt(form.prompt);
  setForm({...form, prompt:randomPrompt})

 }
  return (
    <section className='max-w-7wi mx-auto bg-slate-50 dark:bg-slate-800'>
      <div >
      <Salty />
          <h1 className='font-extrabold text-[#222328] text-[32px] dark:text-[#d5daf0]'>Create Your Imagination</h1>
          <p className='sm-txt
          '>Create imaginative and visually stunning generated by Dall-E Ai and share them with your wife community </p>
      </div>
      <form className='mt-16 max-w-3xl' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-5'>
          <FormField 
          labelName="Your name"
          name="name"
          placeholder="jakkash"
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
          isSurpriseMe
          handleSurpriseMe={handleSurpriseMe}
          />
          <div className='relative bg-gray-50 dark:bg-gray-500 border-gray-300 dark:border-gray-700 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center'>
            {form.photo ? (
              <img src={form.photo} alt={form.prompt} className='w-full h-full object-contain'/>
            ):(
              <img src={preview} alt="preview" className='w-9/12 h-9/12 object-contain opacity-40' />
            )}
            {
              generatingImg && (
                <div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)]'> 
                <Loader  />
                </div>
              )
            }
          </div>
        </div>
        <div className='mt-5 flex gap-5'>
          <button
          type='button'
          onClick={generateImage}
          className={'text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'}
          >
              {generateImage ? 'generate': 'generating'}
          </button>
        </div>
        <div className='mt-10'>
          <p className='text-gray-700 dark:text-[#d5daf0]'> Create the image but never share with other's cause it dosnt even matter</p>
          <button
          type='submit'
          className='mt-3 text-white bg-[#484eee]
          font-medium rounded-md text-sm w-full 
          sm-w-auto
          px-5 py-2.5 text-center
          '
          >
            {loading ? 'Shareing ': 'Share'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default CreatePost