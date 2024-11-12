import { ChangeEvent, DragEvent, useState } from 'react';

import SvgDisplay from './SvgDisplay';

interface SvgInfo {
  url: string;
  dimensions: {
    width: number;
    height: number;
  };
  fileName: string;
  contents: string;
}

const SvgReceiver = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [svgFiles, setSvgFiles] = useState<SvgInfo[]>([]);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    const svgFiles = files.filter(file => file.type === 'image/svg+xml');

    if (svgFiles.length > 0) {
      handleFiles(svgFiles);
    }
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const svgFiles = files.filter(file => file.type === 'image/svg+xml');

      if (svgFiles.length > 0) {
        handleFiles(svgFiles);
      }
    }
  };

  const readFileAsText = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsText(file);
    });

  const handleFiles = async (files: File[]) => {
    const newSvgFiles = await Promise.all(
      files.map(async file => {
        const [url, contents] = await Promise.all([
          Promise.resolve(URL.createObjectURL(file)),
          readFileAsText(file)
        ]);

        const dimensions = await getSvgDimensions(url);

        return {
          url,
          dimensions,
          fileName: file.name,
          contents
        };
      })
    );

    setSvgFiles(prev => [...prev, ...newSvgFiles]);
  };

  const getSvgDimensions = (
    url: string
  ): Promise<{ width: number; height: number }> =>
    new Promise(resolve => {
      const img = new Image();
      img.onload = () => {
        resolve({
          width: img.naturalWidth,
          height: img.naturalHeight
        });
      };
      img.src = url;
    });

  return (
    <div className='flex flex-col gap-4'>
      <div
        role='button'
        tabIndex={0}
        className={`w-[800px] h-72 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer
          ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById('fileInput')?.click()}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            document.getElementById('fileInput')?.click();
          }
        }}
      >
        <input
          type='file'
          id='fileInput'
          className='hidden'
          accept='.svg'
          multiple
          onChange={handleFileInput}
        />
        <svg
          className='w-12 h-12 text-gray-400 mb-4'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
          />
        </svg>
        <p className='text-gray-600'>
          Drag and drop SVG files here, or click to select files
        </p>
      </div>

      {svgFiles.length > 0 && (
        <div className='flex flex-col gap-2'>
          {svgFiles.map((svg, index) => (
            <SvgDisplay
              key={`${svg.fileName}-${index}`}
              svgUrl={svg.url}
              dimensions={svg.dimensions}
              fileName={svg.fileName}
              contents={svg.contents}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SvgReceiver;
