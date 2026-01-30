import Markdown from 'react-markdown';

export default function AboutMeSection({content}: {content: string}) {
  return (
    <div className="hero" id="aboutme">
      <div className="hero-content">
        <Markdown>{content}</Markdown>
      </div>
    </div>
  );
}
