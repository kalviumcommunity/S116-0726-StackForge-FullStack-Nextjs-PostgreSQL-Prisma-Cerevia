import * as React from 'react';
import Image from 'next/image';
import { User, Mail, Calendar, MapPin, Edit } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface ProfileCardProps {
  user: {
    name: string;
    email: string;
    joinedDate: string;
    location: string;
    avatarUrl?: string;
    bio: string;
  };
}

export function ProfileCard({ user }: ProfileCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
      <div className="h-32 bg-gradient-to-r from-primary/40 to-purple-500/40 relative">
        <Button size="sm" variant="secondary" className="absolute top-4 right-4 rounded-full h-8 w-8 bg-black/20 hover:bg-black/40 text-white border-0 backdrop-blur-sm p-0">
          <Edit className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="px-6 pb-6 relative">
        <div className="flex justify-between items-end -mt-12 mb-4">
          <div className="h-24 w-24 rounded-full border-4 border-card bg-secondary flex items-center justify-center overflow-hidden relative">
            {user.avatarUrl ? (
              <Image src={user.avatarUrl} alt={user.name} fill className="object-cover" />
            ) : (
              <User className="h-10 w-10 text-muted-foreground" />
            )}
          </div>
          <Button variant="outline" size="sm" className="mb-2">Edit Profile</Button>
        </div>
        
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">{user.name}</h2>
            <p className="text-sm text-muted-foreground flex items-center mt-1">
              <Mail className="h-4 w-4 mr-1.5" />
              {user.email}
            </p>
          </div>
          
          <p className="text-sm text-foreground leading-relaxed max-w-2xl">
            {user.bio}
          </p>
          
          <div className="flex items-center gap-4 pt-4 border-t border-border mt-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1.5" />
              {user.location}
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1.5" />
              Joined {user.joinedDate}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// style: adjust profile card visual polish step 5

// style: adjust profile card visual polish step 6

// style: adjust profile card visual polish step 7

// style: adjust profile card visual polish step 8

// style: adjust profile card visual polish step 9

// style: adjust profile card visual polish step 10

// style: adjust profile card visual polish step 11

// style: adjust profile card visual polish step 12

// style: adjust profile card visual polish step 13

// style: adjust profile card visual polish step 14

// style: adjust profile card visual polish step 15

// style: adjust profile card visual polish step 16

// style: adjust profile card visual polish step 17

// style: adjust profile card visual polish step 18
