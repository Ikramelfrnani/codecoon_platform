import React from 'react';
import Card from './Card';

export default function CardHome() {
  return (
    <>
    <div style={{display:'flex', justifyContent:'center'}}>
    <div  style={{width:'50%',marginRight:'5%',marginTop:'10%'}}>
      <h1 style={{fontSize:'3rem'}}>Python, JavaScript, <br></br>
HTML, CSS and more</h1>
<h3  style={{fontSize:'1.5rem'}}>Choose from a variety of beginner-friendly 
programming courses, expertly designed for 
effective learning.</h3>
</div>
      <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginLeft:'10%',
      marginTop:"12%"
    }}>
      <style>
        {`
          @keyframes wiggle {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(5deg); }
          }

          @keyframes bob {
            0% { transform: translateY(0); }
            100% { transform: translateY(-2px); }
          }

          #left-ear, #right-ear {
            transform-origin: center;
            animation: wiggle 1s ease-in-out infinite alternate;
          }

          #right-ear {
            animation-delay: 0.2s;
          }

          #nose {
            animation: bob 1.2s ease-in-out infinite alternate;
          }
        `}
      </style>

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56.69 56.69" width="250">
        <defs>
          <style>
            {`.cls-1{fill:#804a97;}.cls-2{fill:#fff;}`}
          </style>
        </defs>

        <path className="cls-1" d="M7.28,17.47v5.89L29.79,8.78,52.3,23.36V17.18L32.54,4.05s-3-1.45-5.43.08Z"/>

        {/* Ears */}
        <polygon id="left-ear" className="cls-1" points="10.2 15.29 8.93 5.94 19.45 8.96 10.2 15.29"/>
        <polygon id="right-ear" className="cls-1" points="40.12 8.87 50.55 5.94 49.47 15.1 40.12 8.87"/>

        {/* Nose */}
        <polygon id="nose" className="cls-1" points="26.32 27.9 33.26 27.9 29.79 31.08 26.32 27.9"/>

        {/* Other parts */}
        <polygon className="cls-2" points="32.52 16.43 32.52 22.54 42.58 28.7 32.52 34.88 32.52 40.97 46.59 31.77 46.59 25.68 32.52 16.43"/>
        <polygon className="cls-2" points="27.1 16.43 27.1 22.52 17.04 28.7 27.1 34.86 27.1 40.97 13.03 31.72 13.03 25.63 27.1 16.43"/>
      </svg>
    </div>
    </div>
    <div className="cards-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      <Card
        title="HTML"
        description="Get familiar with the foundational building blocks of web development, understand the structure of web pages, and start building real websites."
        image="/Images/html-5-svgrepo-com.svg"
      />

      <Card
        title="CSS"
        description="CSS styles the appearance and layout of web pages, making them visually appealing and responsive."
        image="/Images/css-3-svgrepo-com.svg"
      />

      <Card
        title="JavaScript"
        description="Dive into the world of JavaScript, the programming language to manipulate web page elements, build web applications, and more."
        image="/Images/javascript-svgrepo-com.svg"
      />

      <Card
        title="Python"
        description="Explore a beginner-friendly, popular programming language that's renowned for its readability and extensive range of applications."
        image="/Images/python-svgrepo-com.svg"
      />
    <Card
        title="PHP"
        description="Build dynamic and interactive websites.Learn the fundamentals of server-side scripting and create robust web applications"
        image="/Images/php-svgrepo-com.svg"
      />
      <Card
        title="SQL"
        description="Master SQL, an essential skill in data analysis and management, from creating to querying and manipulating databases."
        image="/Images/sql-database-generic-svgrepo-com.svg"
      />

      <Card
        title="React"
        description="Learn to build interactive web applications using React, the most popular JavaScript library for building single-page applications."
        image="/Images/react-svgrepo-com.svg"
      />

      <Card
        title="Laravel"
        description="Master backend web development with Laravel, the leading PHP framework for building robust, scalable, and maintainable web applications."
        image="/Images/laravel-svgrepo-com.svg"
      />
    </div>
    </>
  );
}
