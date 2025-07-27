"use client"
import type { Goal } from '@/features/goals/goalSchema';
import { useGoal } from '@/features/goals/GoalStore';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Page = () => {
  const { allGoals} = useGoal();
  const { id} = useParams();
  const [SingleGoal, setSingleGoal] = useState<Goal | null>(null)
  useEffect(() => {
    
    allGoals.forEach(goal => {
      if(goal.id == Number(id)){
        setSingleGoal(goal)
      }
    });
  }, [])
  
  
  return (
    <div>{SingleGoal && <>
    {SingleGoal.name}
    {SingleGoal.description}
    </>}
    </div>
  )
}

export default Page