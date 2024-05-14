import React, { useState, useEffect } from 'react';
import { Sidebar, SidebarItem, Label } from 'flowbite-react';
import { HiArrowSmRight, HiDocumentText, HiUser, HiOutlineUserGroup, HiAnnotation, HiChartPie } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { signoutSuccess } from '../redux/userSlice';
import { useSelector, useDispatch } from 'react-redux';

const DashSidebar = () => {
  const [activeTab, setActiveTab] = useState('');
  const { currentUser } = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {

  }, []);

  const handleSignout = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/user/signout`, {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log('Error:', data.message);
      } else {
        console.log('Sign-out successful:', data);
        dispatch(signoutSuccess(data));
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Sidebar className='w-full md:w-56'>
      <Sidebar.Items>
        <Sidebar.ItemGroup className='flex flex-col gap-1'>
          <Link to="/dashboard?tab=profile">
            <Sidebar.Item active={activeTab === 'profile'} icon={HiUser} as='div'>
              Profile
            </Sidebar.Item>
          </Link>
       
            <Link to="/dashboard?tab=shelters">
              <Sidebar.Item
                active={activeTab === 'shelters'}
                icon={HiDocumentText}
              >
                Shelters
              </Sidebar.Item>
            </Link>

          <Sidebar.Item  icon={HiArrowSmRight}  className='cursor-pointer' onClick={handleSignout} >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default DashSidebar;
