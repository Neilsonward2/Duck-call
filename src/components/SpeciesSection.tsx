import React from 'react';

interface Species {
  id: string;
  name: string;
  description: string;
  identification: string[];
  imageUrl: string;
}

const speciesData: Species[] = [
  {
    id: '1',
    name: 'Mallard',
    description: 'The most common and recognizable duck in North America.',
    identification: [
      'Glossy green head (Drake)',
      'Yellow bill',
      'White ring around the neck',
      'Brown breast',
      'Blue wing patch (speculum) with white borders'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1470114756574-94833c070c7b?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '2',
    name: 'Wood Duck',
    description: 'A stunningly colorful duck that perches in trees.',
    identification: [
      'Boxy crested head',
      'Iridescent green head with white stripes',
      'Bright red eyes',
      'Red bill with yellow at the base',
      'Chestnut breast with white speckles'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1555616635-640973a3b72c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '3',
    name: 'Blue-winged Teal',
    description: 'A small, fast-flying duck often seen in early migration.',
    identification: [
      'Small, compact body',
      'Slate-blue head with large white crescent (Drake)',
      'Powder-blue wing patches',
      'Black bill',
      'Speckled brown body'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1505235312351-93517228a053?auto=format&fit=crop&q=80&w=800'
  }
];

const SpeciesSection: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 pb-24">
      <div className="bg-white p-4 rounded-xl shadow-sm border border-duck-tan">
        <h2 className="text-xl font-bold mb-2">Identify Duck Species</h2>
        <p className="text-sm text-gray-600">
          Learn to identify common duck species by their unique markings and characteristics.
        </p>
      </div>

      <div className="grid gap-6">
        {speciesData.map((species) => (
          <div key={species.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-duck-tan">
            <div className="aspect-[16/9] w-full overflow-hidden">
              <img
                src={species.imageUrl}
                alt={species.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg text-duck-green">{species.name}</h3>
              <p className="text-sm text-gray-700 mt-1 mb-3">{species.description}</p>

              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-duck-brown">Identification Marks</p>
                <ul className="grid grid-cols-1 gap-1">
                  {species.identification.map((mark, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-duck-orange shrink-0" />
                      {mark}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpeciesSection;
