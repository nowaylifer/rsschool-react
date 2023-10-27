import { Component, ComponentProps } from 'react';
import { cn } from '../utils';

interface ImgProps extends ComponentProps<'img'> {
  src: string;
  placeholderSrc?: string;
  width: number;
  height: number;
}

interface ImgState {
  imgSrc: string;
  isLoading: boolean;
}

export class Img extends Component<ImgProps, ImgState> {
  state = {
    imgSrc: this.props.placeholderSrc ?? this.props.src,
    isLoading: !!this.props.placeholderSrc,
  };

  componentDidMount(): void {
    if (this.props.placeholderSrc) {
      const img = new Image();
      img.src = this.props.src;
      img.onload = () => this.setState({ imgSrc: this.props.src, isLoading: false });
    }
  }

  render() {
    const { src: _, placeholderSrc: __, className, ...props } = this.props;
    const { isLoading, imgSrc } = this.state;

    return (
      <img
        className={cn(
          isLoading ? 'blur-md [clip-path:inset(0)]' : 'transition-[filter] duration-300',
          className
        )}
        src={imgSrc}
        {...props}
      />
    );
  }
}

export default Img;
