import SearchIcon from '@mui/icons-material/Search';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Header = () => {

    return (
        <div className='flex flex-row mt-6'>
            <div className='basis-1/2'>
                <h1 className='ml-6 text-xl'>Avion</h1>
            </div>
            <div className='flex gap-8 flex-row basis-1/2 space-x-30 justify-end text-sm items-center text-neutral-500'>
                <p>About us</p>
                <p>Contact</p>
                <p>Blog</p>
                <SearchIcon />
                <AddShoppingCartIcon />
                <AccountCircleIcon className='mr-9' />
            </div>
        </div>
    )
}

export default Header;