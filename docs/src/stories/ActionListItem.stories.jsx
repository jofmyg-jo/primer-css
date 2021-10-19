import React from 'react'
import clsx from 'clsx'
import {useArgs} from '@storybook/client-api'
import useToggle from './helpers/useToggle.jsx'

export default {
  title: 'Components/ActionList/ActionListItem',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/oMiRuexZW6gqVbMhQd6lwP/Storybook?node-id=2%3A2'
    }
    // actions: {
    //   handles: []
    // }
  },
  excludeStories: ['ListItemTemplate'],
  argTypes: {
    type: {
      options: [0, 1], // iterator
      mapping: ['ActionList-item--default', 'ActionList-item--has-sub-item'], // values
      control: {
        type: 'select',
        labels: ['direct-child', 'contains-children']
      },
      description: 'conditional for CSS specific to li position in ul',
      defaultValue: 'ActionList-item--default'
    },
    size: {
      options: [0, 1, 2], // iterator
      mapping: ['', 'ActionList-item-content--sizeMedium', 'ActionList-item-content--sizeLarge'], // values
      control: {
        type: 'select',
        labels: ['default', 'medium', 'large']
      },
      description: 'small (default), medium, large',
      defaultValue: ''
    },
    variant: {
      options: [0, 1], // iterator
      mapping: ['', 'ActionList-item--danger'], // values
      control: {
        type: 'select',
        labels: ['default', 'danger']
      },
      defaultValue: ''
    },
    subItem: {
      defaultValue: false,
      control: {type: 'boolean'}
    },
    containsSubItem: {
      defaultValue: false,
      control: {type: 'boolean'}
    },
    leadingVisual: {
      defaultValue: '',
      name: 'leadingVisual',
      type: 'string',
      description: 'Paste [Octicon](https://primer.style/octicons/) in control field'
    },
    leadingVisualSize: {
      options: [0, 1, 2], // iterator
      mapping: ['ActionList-item-visual--16', 'ActionList-item-visual--20', 'ActionList-item-visual--24'], // values
      control: {
        type: 'select',
        labels: ['16px', '20px', '24px']
      },
      description: 'leading visual width',
      defaultValue: 'ActionList-item-visual--16'
    },
    trailingVisual: {
      defaultValue: '',
      name: 'trailingVisual',
      type: 'string',
      description: 'Paste [Octicon](https://primer.style/octicons/) in control field'
    },
    text: {
      defaultValue: 'Item label',
      type: 'string',
      name: 'text',
      description: 'string'
    },
    href: {
      defaultValue: '',
      type: 'string',
      name: 'href',
      description: 'Item link (href)'
    },
    ariaCurrent: {
      options: ['location', 'page'],
      control: {type: 'select'},
      description: 'location for anchor links, page for global page navigation'
    },
    description: {
      defaultValue: '',
      type: 'string',
      name: 'description',
      description: 'string'
    },
    descriptionVariant: {
      options: [0, 1], // iterator
      mapping: ['ActionList-item-label--blockDescription', 'ActionList-item-label--inlineDescription'], // values
      control: {
        type: 'select',
        labels: ['block', 'inline']
      },
      description: 'block (default), inline',
      defaultValue: 'ActionList-item-label--blockDescription'
    },
    id: {
      defaultValue: '',
      type: 'string',
      name: 'id',
      description: 'Used for aria-labelledby if nested group within item'
    },
    collapsible: {
      defaultValue: false,
      control: {type: 'boolean'}
    },
    collapsed: {
      defaultValue: false,
      control: {type: 'boolean'}
    },
    itemOnClick: {
      action: 'clicked'
    },
    expanded: {
      control: {type: 'boolean'}
    }
  }
  //   decorators: [
  //     Story => (
  //       <div style={{margin: '3em', border: 'dashed 1px var(--color-scale-gray-3)'}}>
  //         <ul className="ActionList" role="menu">
  //           <Story />
  //         </ul>
  //       </div>
  //     )
  //   ]
}

export const ListItemTemplate = ({
  text,
  size,
  leadingVisual,
  leadingVisualSize,
  trailingVisual,
  description,
  descriptionVariant,
  variant,
  href,
  ariaCurrent,
  children,
  subItem,
  containsSubItem,
  id,
  type,
  collapsible,
  collapsed,
  trailingAction,
  itemOnClick,
  expanded
}) => {
  //   const [args, updateArgs] = useArgs()
  const [isCollapsed, itemisCollapsed] = useToggle()
  return (
    <li
      className={clsx(
        'ActionList-item',
        type && `${type}`,
        ariaCurrent && 'ActionList-item--nav-active',
        subItem && `ActionList-item--sub-item`,
        containsSubItem && `ActionList-item--has-sub-item`,
        variant && `${variant}`
      )}
      //   onClick={() => updateArgs({collapsed: true})}
      onClick={itemisCollapsed}
      role={href ? 'none' : 'menuitem'}
      id={id}
      aria-haspopup={collapsible ? 'true' : undefined}
      aria-expanded={isCollapsed ? 'false' : 'true'}
    >
      {href ? (
        <>
          <a
            href={href}
            role={href ? 'menuitem' : undefined}
            tabindex="-1"
            aria-current={ariaCurrent}
            className={clsx(
              text && 'ActionList-item-content',
              size && `${size}`,
              leadingVisual && 'ActionList-item-content--leadingVisual',
              trailingVisual && 'ActionList-item-content--trailingVisual',
              (leadingVisual || trailingVisual) && description && 'ActionList-item-content--blockDescription',
              leadingVisual && leadingVisualSize && `${leadingVisualSize}`
            )}
          >
            {leadingVisual && (
              <span
                className="ActionList-item-visual ActionList-item-visual--leading"
                dangerouslySetInnerHTML={{__html: leadingVisual}}
              />
            )}
            {description && (
              <span className={`${descriptionVariant}`}>
                <span className="ActionList-item-label">{text}</span>
                <span className="ActionList-item-description">{description}</span>
              </span>
            )}
            {!description && text && <span className="ActionList-item-label">{text}</span>}
            {trailingVisual && (
              <span
                className="ActionList-item-visual ActionList-item-visual--trailing"
                dangerouslySetInnerHTML={{__html: trailingVisual}}
              />
            )}
            {trailingAction ||
              (collapsible && (
                <span className="ActionList-item-action ActionList-item-action--trailing">
                  {collapsible && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      width="16"
                      height="16"
                      className="ActionList-item-content--collapseIcon"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12.78 6.22a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06 0L3.22 7.28a.75.75 0 011.06-1.06L8 9.94l3.72-3.72a.75.75 0 011.06 0z"
                      ></path>
                    </svg>
                  )}
                  {trailingAction}
                </span>
              ))}
          </a>
          {children}
        </>
      ) : (
        <>
          <span
            className={clsx(
              text && 'ActionList-item-content',
              size && `${size}`,
              leadingVisual && 'ActionList-item-content--leadingVisual',
              trailingVisual && 'ActionList-item-content--trailingVisual',
              (leadingVisual || trailingVisual) && description && 'ActionList-item-content--blockDescription',
              collapsible && 'ActionList-item-content--collapsible'
            )}
          >
            {leadingVisual && (
              <span
                className="ActionList-item-visual ActionList-item-visual--leading"
                dangerouslySetInnerHTML={{__html: leadingVisual}}
              />
            )}
            {description && (
              <span className={`${descriptionVariant}`}>
                <span className="ActionList-item-label">{text}</span>
                <span className="ActionList-item-description">{description}</span>
              </span>
            )}
            {!description && text && <span className="ActionList-item-label">{text}</span>}

            {trailingVisual && (
              <span
                className="ActionList-item-visual ActionList-item-visual--trailing"
                dangerouslySetInnerHTML={{__html: trailingVisual}}
              />
            )}
            {trailingAction ||
              (collapsible && (
                <span className="ActionList-item-action ActionList-item-action--trailing">
                  {collapsible && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      width="16"
                      height="16"
                      className="ActionList-item-content--collapseIcon"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12.78 6.22a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06 0L3.22 7.28a.75.75 0 011.06-1.06L8 9.94l3.72-3.72a.75.75 0 011.06 0z"
                      ></path>
                    </svg>
                  )}
                  {trailingAction}
                </span>
              ))}
          </span>
          {children}
        </>
      )}
    </li>
  )
}
ListItemTemplate.args = {
  expanded: false
}

export const Playground = ListItemTemplate.bind({})
Playground.decorators = [
  Story => (
    <div style={{margin: '3rem', border: 'dashed 1px var(--color-scale-gray-3)'}}>
      <ul className="ActionList" role="menu">
        <Story />
      </ul>
    </div>
  )
]
