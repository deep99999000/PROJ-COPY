import { ShowDate } from '@/components/ShowDate';
import { Button } from '@/components/ui/button';
import type { Goal } from '@/features/goals/goalSchema';
import { Pencil } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const SingleGoal = ({ goal }: { goal: Goal }) => {
  const { id, name, description, category, endDate } = goal;

  return (
    <div
      key={goal.id}
      className="p-4 border rounded-lg bg-white hover:shadow-md transition-all flex flex-col gap-2"
    >
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
        <div className="flex gap-2">
          <Link href={`/goals/${id}`} passHref>
            <Button variant="outline" size="sm" className="h-8">
              <Pencil size={15} className="mr-1" />
              Edit
            </Button>
          </Link>
        </div>
      </div>

      {description && (
        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
      )}

      <div className="flex flex-wrap items-center justify-between mt-2 gap-2">
        {category && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {category}
          </span>
        )}

        {endDate && (
          <div className="flex items-center text-sm text-gray-500">
            <ShowDate date={endDate} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleGoal;