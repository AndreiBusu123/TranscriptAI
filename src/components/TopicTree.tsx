import React from 'react';
import { ChevronRight, ChevronDown, FolderTree } from 'lucide-react';
import type { Topic } from '../types';

interface TopicTreeProps {
  topics: Topic[];
  selectedTopics: string[];
  onTopicSelect: (topicId: string) => void;
}

const TopicItem: React.FC<{ topic: Topic; level: number; selectedTopics: string[]; onSelect: (id: string) => void }> = ({
  topic,
  level,
  selectedTopics,
  onSelect,
}) => {
  const [isExpanded, setIsExpanded] = React.useState(true);
  const hasChildren = topic.children.length > 0;
  const isSelected = selectedTopics.includes(topic.id);

  return (
    <div className="select-none">
      <div
        className={`flex items-center py-1 px-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 ${
          isSelected ? 'bg-blue-50 text-primary-900' : 'text-secondary-800 hover:bg-secondary-100'
        }`}
        style={{ paddingLeft: `${level * 1.5}rem` }}
        onClick={() => onSelect(topic.id)}
      >
        {hasChildren ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="p-1 hover:bg-secondary-100 rounded transition-colors"
          >
            {isExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
        ) : (
          <span className="w-6" />
        )}
        <FolderTree className="w-4 h-4 mr-2" />
        <span className="text-sm transition-colors">{topic.name}</span>
      </div>
      {isExpanded && hasChildren && (
        <div>
          {topic.children.map((child) => (
            <TopicItem
              key={child.id}
              topic={child}
              level={level + 1}
              selectedTopics={selectedTopics}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const TopicTree: React.FC<TopicTreeProps> = ({ topics, selectedTopics, onTopicSelect }) => {
  return (
    <div className="w-64 bg-gray-50 rounded-lg shadow-medium p-6 border border-secondary-200">
      <h2 className="text-lg font-semibold mb-6 flex items-center text-secondary-900">
        <FolderTree className="w-5 h-5 mr-2" />
        Topics
      </h2>
      {topics.map((topic) => (
        <TopicItem
          key={topic.id}
          topic={topic}
          level={0}
          selectedTopics={selectedTopics}
          onSelect={onTopicSelect}
        />
      ))}
    </div>
  );
};