import classNamesLib from 'classnames';

function Skeleton({ howMany, additionalClassNames }) {
  const outerClassNames = classNamesLib(
    'relative',
    'overflow-hidden',
    'bg-gray-200',
    'rounded',
    'mb-2.5',
    additionalClassNames // classes received as props - height and width
  );
  const innerClassNames = classNamesLib(
    'animate-shimmer',
    'absolute',
    'inset-0',
    '-translate-x-full',
    'bg-gradient-to-r',
    'from-gray-200',
    'via-white',
    'to-gray-200'
  );

  // const boxes = [];
  // for (let i = 0; i < howMany; i++) {
  //   boxes.push(<div key={i} />);
  // }

  const boxes = Array(howMany).fill(0).map((_, i) => {
      return (
        <div key={i} className={outerClassNames}>
          <div className={innerClassNames} />
        </div>
      );
    });

  return boxes;
}

export default Skeleton;
