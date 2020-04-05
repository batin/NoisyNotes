import React from 'react'
import Section from './section'
const section1 = () => {
  return (
    <Section>
      <div className='d-flex flex-column innerSection'>
        <h1 className='text-center'>
          Noisy Notes, senin için not tutar.
        </h1>
        <p className='text-center'>
          Not tutmayı denediniz ve
          bir süre sonra yorulup devam etmeyi bıraktınız değil mi?
          Hadi, notlarınızı sesli olarak tutun!
        </p>
        <button className='btn'>Ücretsiz Üye Ol</button>
      </div>
      <div className='s1-img' />
    </Section>
  )
}

export default section1
