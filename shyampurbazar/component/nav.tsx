import Link from 'next/link'
export const Nav = () => {
    return (
        <div className=' flex justify-center sticky top-0 z-50  bg-orange-500'>
            <div className='flex justify-center gap-5 h-10 items-center'>
                <Link href='/'>Home</Link>
                <Link href='about'>About</Link>
            </div>

        </div>
    )
}