export interface ProgressCardProps {
  fileName: string;
  progress: number;
}

export function ProgressCard({ fileName, progress }: ProgressCardProps) {
  return (
    <>
      <div className="flex justify-between text-sm mb-1">
        <span>{fileName}</span>
        <span>{progress}%</span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </>
  );
}
