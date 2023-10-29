import { Component, ComponentProps } from 'react';
import { promiseTimeout } from '../utils';
import { cn } from '../utils';

interface ImgProps extends ComponentProps<'img'> {
  src: string;
  placeholderSrc?: string;
  width: number;
  height: number;
}

interface ImgState {
  imgSrc: string;
  loading: boolean;
}

export class Img extends Component<ImgProps, ImgState> {
  state: ImgState = {
    imgSrc: this.props.src,
    loading: false,
  };

  async componentDidMount() {
    const { src, placeholderSrc } = this.props;

    if (!placeholderSrc) {
      return;
    }

    const img = new Image();

    const imgComplete = new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
      img.src = src;
    });

    try {
      await promiseTimeout(10, imgComplete);
    } catch {
      this.setState({ imgSrc: placeholderSrc, loading: true });
      img.onload = () => this.setState({ imgSrc: src, loading: false });
    }
  }

  render() {
    const { src: _, placeholderSrc: __, className, ...props } = this.props;
    const { loading, imgSrc } = this.state;

    return (
      <img
        className={cn(loading ? 'blur-md [clip-path:inset(0)]' : 'transition-[filter]', className)}
        src={imgSrc}
        {...props}
      />
    );
  }
}

export default Img;
