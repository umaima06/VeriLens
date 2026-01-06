import React from 'react';

const LayerCard = ({ layerNum, title, description, color = "text-green-900" }) => {
  return (
    <div className="p-6 rounded-xl bg-white border border-transparent hover:border-gray-200 transition-all duration-300 hover:shadow-lg hover:shadow-gray-100/50 group">
      <span className={`text-xs font-bold tracking-wider ${color} uppercase mb-3 block opacity-70 group-hover:opacity-100 transition-opacity`}>
        Layer {layerNum}
      </span>
      <h3 className="text-2xl font-serif text-gray-900 mb-3 group-hover:text-green-900 transition-colors">
        {title}
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default LayerCard;