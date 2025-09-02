import React from 'react';
import { Plus, Edit } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const ProfileSelector = ({ profiles, onSelectProfile }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-medium text-white mb-4">
            Who's watching?
          </h1>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-center max-w-2xl mx-auto">
          {profiles.map((profile) => (
            <div
              key={profile.id}
              className="flex flex-col items-center cursor-pointer group"
              onClick={() => onSelectProfile(profile)}
            >
              <Card className="bg-transparent border-0 hover:border-white transition-all duration-200 group-hover:scale-105">
                <CardContent className="p-4">
                  <Avatar className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-3">
                    <AvatarImage 
                      src={profile.avatar} 
                      alt={profile.name}
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-gray-700 text-white text-xl">
                      {profile.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-white text-lg font-medium text-center group-hover:text-gray-300 transition-colors">
                    {profile.name}
                  </h3>
                  {profile.isKids && (
                    <p className="text-gray-400 text-sm text-center mt-1">Kids</p>
                  )}
                </CardContent>
              </Card>
            </div>
          ))}

          {/* Add Profile Button */}
          <div className="flex flex-col items-center cursor-pointer group">
            <Card className="bg-transparent border-0 hover:border-white transition-all duration-200 group-hover:scale-105">
              <CardContent className="p-4">
                <div className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-3 bg-gray-700 rounded-full flex items-center justify-center group-hover:bg-gray-600 transition-colors">
                  <Plus size={32} className="text-gray-400 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-gray-400 text-lg font-medium text-center group-hover:text-white transition-colors">
                  Add Profile
                </h3>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="text-center mt-16">
          <Button
            variant="outline"
            size="lg"
            className="border-gray-400 text-gray-400 hover:border-white hover:text-white bg-transparent"
          >
            <Edit size={18} className="mr-2" />
            Manage Profiles
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSelector;