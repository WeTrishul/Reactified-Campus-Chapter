import React from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function DisplayBlogs() {
  const location = useLocation();
  const [displayBlogs, setDisplayBlogs] = useState({});

  useEffect(() => {
    console.log('main id ', location.state);

    axios
      .get('http://localhost:3000/showblog/' + location.state)
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        console.log(data);
        setDisplayBlogs(data.blogs);

        let main = document.querySelector('main');
        let str = data.blogs.content;
        let strhtml = str;
        main.innerHTML = strhtml;
      });
  }, []);

  return (
    <div>
      <div className='view-question'>
        {/* <div className='viewBlogsHeading'>
          <h2>View Questions</h2>
        </div> */}
        <div>
          <div className='DisplayblogsOuterBox'>
            <div className='DisplayblogsInnerBox'>
              <div className='DisplayblogsListBox'>
                {/* <div className='DisplayblogsuserImage'>
                  <img src='' alt='' />
                </div>
                <span>{displayBlogs.userid.username}</span> */}
                <div
                  className='DisplayblogsTitle'
                  style={{ textAlign: 'center' }}
                >
                  <h2>{displayBlogs.title}</h2>
                </div>
                <div
                  className='DisplayblogsDescription'
                  style={{
                    textAlign: 'left',
                    paddingLeft: '6rem',
                  }}
                >
                  <h4>Description: {displayBlogs.description} </h4>
                </div>
                <div
                  className='DisplayblogsContent'
                  style={{
                    textAlign: 'left',
                    paddingLeft: '5rem',
                    paddingTop: '10px',
                    paddingBottom: '10px',
                  }}
                >
                  <main style={{ width: '100%', height: 'auto' }}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Fugiat, nihil molestias, quam pariatur consequatur eligendi
                    perferendis sint eum vel provident modi quas dolores dolore
                    sequi, eius nulla a? Rerum nemo modi enim amet, voluptate
                    nobis. Optio unde iste, maiores iure assumenda pariatur
                    aliquid quasi adipisci culpa, veniam veritatis labore sequi
                    dolorem, excepturi minima ea saepe autem porro accusantium
                    omnis rerum cumque. Omnis quaerat modi tenetur voluptates?
                    Neque, totam voluptatem eligendi tempore nam officia, iusto
                    maiores eaque dolorum dolore illo tempora quis, ut minima
                    velit odio fugiat explicabo. Ad veritatis quia, totam eos
                    porro vel minima ab non, magnam, cumque quibusdam
                    voluptatem. Veritatis dolor eum earum id fugiat autem
                    dolorum. Alias ipsum sed, ipsa molestias exercitationem
                    repellendus perspiciatis nesciunt magni necessitatibus omnis
                    rem, veniam soluta nulla itaque qui suscipit, numquam optio
                    obcaecati? Porro, natus aut impedit accusantium tenetur
                    magnam praesentium officia numquam atque distinctio
                    obcaecati eos quisquam provident at, quas placeat
                    dignissimos earum rerum quasi alias maiores. Eaque fugit
                    suscipit aspernatur voluptates, maxime ut soluta itaque
                    alias voluptate delectus doloremque quo commodi eligendi
                    consequuntur. Alias, vitae nam! Magnam, aut sint fuga ex
                    harum nam laboriosam culpa alias? Culpa cumque laboriosam in
                    impedit, modi numquam, quis quaerat doloribus debitis
                    voluptatum, harum fugiat!
                  </main>
                </div>
              </div>

              {/* <div className='DisplayblogsListBox'>
                <div className='DisplayblogsTitle'>
                    title:
                </div>
                <div className='DisplayblogsDescription'></div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DisplayBlogs;
