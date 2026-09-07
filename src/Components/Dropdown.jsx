import { Link } from 'react-router'

export default function Dropdown({titleName = "", pages = [], links = []}){
    return(
        <div className='group'>
            {titleName}
            
            <div className='absolute left-0 top-full bg-white border-1 border-dotted rounded-md hidden group-hover:block duration-100'>   
                {pages.map((page, index) => <Link to={links[index]}><div className='p-2 hover:bg-blue-100'>{page}</div></Link>)}
            </div>
        </div>
    );
}