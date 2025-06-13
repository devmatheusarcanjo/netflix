export default function ImageItem({ url, ref, onLoad }) {
  return <img src={urlImage} loading="lazy" ref={img} onLoad={waitloading} />;
  {
    imageLoading ? <Esqueleto /> : null;
  }
}
