// pages/robots.txt.js

export default function Robots() {
  return null;
}

export async function getServerSideProps({ res }) {
  const robotsTxt = `
User-agent: *
Disallow: 
  `;

  res.setHeader("Content-Type", "text/plain");
  res.write(robotsTxt);
  res.end();

  return {
    props: {},
  };
}
