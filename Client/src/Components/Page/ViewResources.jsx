import React from 'react';
import './Blogs.css';
import { Link } from 'react-router-dom';

function ViewResources() {
  return (
    <div className='view-question'>
      <div className='viewBlogsHeading'>
        <h2>View Questions</h2>
      </div>
      <div>
        <div className='ViewblogsOuterBox'>
          <div className='ViewblogsInnerBox'>
            <div className='ViewblogsListBox'>
              <Link to='ViewCategory/CP' className='ViewallBlogsLink'>
                CP
              </Link>
            </div>
            <div className='ViewblogsListBox'>
              <Link to='ViewCategory/DSA' className='ViewallBlogsLink'>
                DSA
              </Link>
            </div>
            <div className='ViewblogsListBox'>
              <Link to='ViewCategory/APTI' className='ViewallBlogsLink'>
                Aptitude
              </Link>
            </div>
            <div className='ViewblogsListBox'>
              <Link to='ViewCategory/CORE' className='ViewallBlogsLink'>
                Core Subjects (CS)
              </Link>
            </div>
            <div className='ViewblogsListBox'>
              <Link to='ViewCategory/DEV' className='ViewallBlogsLink'>
                Development
              </Link>
            </div>
            <div className='ViewblogsListBox'>
              <Link to='ViewCategory/GATE' className='ViewallBlogsLink'>
                Gate
              </Link>
            </div>
            <div className='ViewblogsListBox'>
              <Link to='ViewCategory/PLACEMENTS' className='ViewallBlogsLink'>
                Placement
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewResources;
