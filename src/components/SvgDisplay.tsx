interface SvgDisplayProps {
  svgUrl: string;
  dimensions: {
    width: number;
    height: number;
  };
  fileName: string;
  contents: string;
}

const SvgDisplay = ({
  svgUrl,
  dimensions,
  fileName,
  contents
}: SvgDisplayProps) => {
  // Calculate scaled dimensions to fit within 400x400 while maintaining aspect ratio
  const scale = Math.min(400 / dimensions.width, 400 / dimensions.height);
  const scaledWidth = Math.round(dimensions.width * scale);
  const scaledHeight = Math.round(dimensions.height * scale);

  return (
    <div className='border rounded-lg p-6 w-[800px]'>
      <div className='flex gap-6'>
        <div className='w-[400px] h-[400px] border rounded flex items-center justify-center bg-gray-50'>
          <img
            src={svgUrl}
            alt={fileName}
            style={{
              width: `${scaledWidth}px`,
              height: `${scaledHeight}px`
            }}
          />
        </div>
        <div className='flex-1'>
          <h3
            className='text-xl font-medium text-gray-900 truncate'
            title={fileName}
          >
            {fileName}
          </h3>
          <div className='text-base text-gray-500 mt-2'>
            <p>Width: {dimensions.width}px</p>
            <p>Height: {dimensions.height}px</p>
            <p className='mt-1 text-gray-400'>
              Preview: {scaledWidth}px × {scaledHeight}px
            </p>
          </div>
        </div>
      </div>
      <details className='mt-4'>
        <summary className='text-sm text-gray-600 cursor-pointer hover:text-gray-900'>
          View SVG Code
        </summary>
        <pre className='mt-3 p-4 bg-gray-50 rounded text-sm overflow-x-auto'>
          {contents}
        </pre>
      </details>
    </div>
  );
};

export default SvgDisplay;
