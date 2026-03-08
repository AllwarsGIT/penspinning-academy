import React from 'react'


function Header () {
    return (
        <header className="bg-white fixed top-0 px-4 left-0 w-full flex z-10">
            <nav className="flex items-center justify-between w-full h-16 ">
                <div className="bg-blue-300 w-12 h-12 rounded-full flex items-center justify-center">
                    
                </div>

                <div className="bg-gray-500 w-15 h-8 border-2 border-black rounded-full items-center">
                    <div className="bg-white w-7 h-7 rounded-full">

                    </div>
                </div>

                <div className="bg-black w-12 h-12 rounded-full">

                </div>
                
            </nav>
        </header>
    )
}

export default Header
