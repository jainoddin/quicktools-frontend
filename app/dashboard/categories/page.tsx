'use client';
import React, { useMemo } from 'react';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import Link from 'next/link';
import { allTools, IconMap, categoriesList } from '../../../components/tools/ToolsClient';

function DynamicIcon({ name, className }: { name: string; className?: string }) {
  const Icon = IconMap[name];
  if (!Icon) return null;
  return <Icon className={className} />;
}

const colors = [
  'bg-[#10B981] text-white',
  'bg-[#6D5EF8] text-white',
  'bg-[#EF4444] text-white',
  'bg-[#F59E0B] text-white',
  'bg-[#8B5CF6] text-white',
  'bg-[#3B82F6] text-white',
];

export default function CategoriesPage() {
  const dynamicCategories = useMemo(() => {
    return categoriesList
      .filter(cat => cat.name !== 'All Tools')
      .map((cat, index) => {
        const count = allTools.filter(t => t.category === cat.name).length;
        return {
          name: cat.name,
          tools: count,
          iconName: cat.iconName,
          color: colors[index % colors.length]
        };
      })
      .filter(cat => cat.tools > 0);
  }, []);

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#111827] mb-1">Categories</h1>
        <p className="text-sm text-[#6B7280]">Browse tools by category</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
        {dynamicCategories.map((cat, i) => (
          <Link href={`/dashboard/all?category=${cat.name}`} key={i} className="bg-white border border-[#E5E7EB] rounded-2xl p-6 hover:border-[#6D5EF8] hover:shadow-xl hover:shadow-[#6D5EF8]/10 transition-all duration-300 group flex flex-col items-start text-left min-h-[160px] justify-center">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${cat.color} mb-4 group-hover:scale-110 transition-transform shadow-md`}>
              <DynamicIcon name={cat.iconName} className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-[#111827] mb-1 group-hover:text-[#6D5EF8] transition-colors">{cat.name}</h3>
            <p className="text-xs font-medium text-[#6B7280]">{cat.tools} {cat.tools === 1 ? 'Tool' : 'Tools'}</p>
          </Link>
        ))}
      </div>
    </DashboardLayout>
  );
}
