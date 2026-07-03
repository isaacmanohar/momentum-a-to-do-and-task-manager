import { Download } from 'lucide-react';
import toast from 'react-hot-toast';

export function ReportExportOptions() {
  const handleExport = (type: string) => {
    toast.success(`Generating ${type} report... (Mock)`);
  };

  return (
    <div className="flex gap-2">
      <button 
        onClick={() => handleExport('PDF')}
        className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-muted hover:bg-muted/80 rounded-md transition-colors"
      >
        <Download size={14} /> PDF
      </button>
      <button 
        onClick={() => handleExport('CSV')}
        className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-muted hover:bg-muted/80 rounded-md transition-colors"
      >
        <Download size={14} /> CSV
      </button>
    </div>
  );
}
