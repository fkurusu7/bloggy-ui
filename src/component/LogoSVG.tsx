function LogoSVG() {
  return (
    <div className="logo">
      <svg width="300" height="200" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
        {/* Background */}
        <rect width="300" height="200" fill="none" />

        {/* Large arc (first “split”) */}
        <path
          d="M 50 200 
       A 100 100 0 0 1 250 200"
          fill="none"
          stroke="currentColor"
          strokeWidth="11"
        />

        {/* Medium arc (second “split”) */}
        <path
          d="M 90 190 
       A 60 60 0 0 1 210 190"
          fill="none"
          stroke="currentColor"
          strokeWidth="11"
        />

        {/* Small arc (third “split”) */}
        <path
          d="M 120 180 
       A 30 30 0 0 1 180 180"
          fill="none"
          stroke="currentColor"
          strokeWidth="11"
        />

        {/* Central “found” point */}
        <circle cx="150" cy="180" r="10" fill="currentColor" />
      </svg>
      {/* <svg width="300" height="200" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
        <rect width="300" height="200" fill="#222" />

        <path
          d="M 50 200 
       A 100 100 0 0 1 250 200"
          fill="none"
          stroke="#fff"
          stroke-width="4"
        />

        <path
          d="M 90 190 
       A 60 60 0 0 1 210 190"
          fill="none"
          stroke="#fff"
          stroke-width="4"
        />

        <path
          d="M 120 180 
       A 30 30 0 0 1 180 180"
          fill="none"
          stroke="#fff"
          stroke-width="4"
        />

        <circle cx="150" cy="180" r="6" fill="#fff" />

        <text x="150" y="230" fill="#fff" font-size="20" font-family="Arial" text-anchor="middle">
          barudesu
        </text>

        <text x="150" y="260" fill="#fff" font-size="16" font-family="Arial" text-anchor="middle">
          barudesu.codes
        </text>
      </svg> */}
    </div>
  );
}

export default LogoSVG;
