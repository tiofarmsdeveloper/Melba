import React from 'react';
import { Link } from 'react-router-dom';
import { UserCog, Hash, UserPlus, ChevronRight } from 'lucide-react';
import EnterCodeDialog from './EnterCodeDialog';

const QuickActions = () => {
  const actions = [
    {
      icon: UserCog,
      title: 'Account Settings',
      description: 'Update your account details',
      link: '/profile',
    },
    {
      icon: Hash,
      title: 'Enter Code',
      description: 'Add points to your loyalty account',
      dialog: true,
    },
    {
      icon: UserPlus,
      title: 'Refer a Friend',
      description: 'Share the love',
      link: '/refer',
    },
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold text-brand-white mb-3">Quick Actions</h3>
      <div className="space-y-2">
        {actions.map((action, index) => {
          const content = (
            <div className="flex items-center p-3 bg-brand-charcoal rounded-lg shadow-neumorphic-out transition-transform active:scale-[0.98]">
              <div className="w-10 h-10 bg-brand-charcoal rounded-lg flex items-center justify-center shadow-neumorphic-in mr-4">
                <action.icon className="w-5 h-5 text-brand-silver" />
              </div>
              <div className="flex-grow">
                <p className="font-semibold text-brand-white">{action.title}</p>
                <p className="text-xs text-brand-silver">{action.description}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-brand-silver/50" />
            </div>
          );

          if (action.dialog) {
            return (
              <EnterCodeDialog key={index}>
                {content}
              </EnterCodeDialog>
            );
          }

          return (
            <Link to={action.link || '#'} key={index}>
              {content}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;