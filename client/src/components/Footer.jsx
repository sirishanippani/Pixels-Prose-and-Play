import React from 'react'
import { Footer } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function FooterCom() {
  return (
    <Footer container className='border border-t-8 border-teal-400'>
        <div className='w-full max-w-7xl mx-auto'>
            <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
                <div className='mt-5'>
                    <Link to='/' className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
                        <span className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white">
                            <span className='px-2 py-1 bg-gradient-to-r from-cyan-600 via-violet-700 to-teal-400 rounded-lg text-white'>Pixel's, Proses and Play</span>
                            <span className="block text-xs text-cyan-700 ">Unraveling Bytes, Books, and Blockbusters</span>
                        </span>
                    </Link>
                </div>
                <div className='grid grid-cols-2 gap-3 sm: mt-4 sm:grid-cols-3 sm:gap-6'>
                    <div>
                        <Footer.Title title="About" />
                        <Footer.LinkGroup col>
                            <Footer.Link href="/">Home</Footer.Link>
                            <Footer.Link href="#">About</Footer.Link>
                            <Footer.Link href="#">Projects</Footer.Link>
                        </Footer.LinkGroup>
                    </div>                  
                </div>
            </div>
            <Footer.Divider />
            <div className='w-full sm:flex sm:items-center sm:justify-between'>
                <Footer.Copyright href="#" by="Sirisha" year={2022} />
                <div className='flex gap-6 sm:mt-0 mt-4 sm:justify-center'>
                    <Footer.Icon href="#" icon={FaGithub} />
                    <Footer.Icon href="#" icon={FaLinkedin} />
                    <Footer.Icon href="#" icon={FaInstagram} />
                </div>
            </div>
        </div>
        
    </Footer>
  )
}
