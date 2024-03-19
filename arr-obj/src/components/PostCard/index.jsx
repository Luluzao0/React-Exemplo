import './styles.css';

export const PostCard = ({ id, title, body, cover })  => ( //props e componentes    
  <div className="post">
    <img src={cover} alt={title} />
    <div key={id} className="post-content">
      <h1>{id}</h1>
      <h2>{title}</h2>
      <p> {body} </p>
    </div>
  </div>
);
