function LogoSVG() {
  return (
    // styles/blog/_logo.scss
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
          strokeWidth="18"
        />

        {/* Medium arc (second “split”) */}
        <path
          d="M 90 190 
       A 60 60 0 0 1 210 190"
          fill="none"
          stroke="currentColor"
          strokeWidth="16"
        />

        {/* Small arc (third “split”) */}
        <path
          d="M 120 180 
       A 30 30 0 0 1 180 180"
          fill="none"
          stroke="currentColor"
          strokeWidth="14"
        />

        {/* Central “found” point */}
        <circle cx="150" cy="180" r="14" fill="currentColor" />
      </svg>
    </div>
  );
}

export default LogoSVG;
