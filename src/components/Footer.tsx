import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="w-full py-8 mt-16">
            <div className="max-w-7xl mx-auto px-4">
                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent mb-6"></div>
                
                {/* Footer Content */}
                <div className="text-center space-y-2">
                    <p className="text-slate-400">
                        <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">Piplator</span> © 2025
                    </p>
                    <p className="text-slate-500 text-sm">
                        Trade responsibly. Past performance does not guarantee future results.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
