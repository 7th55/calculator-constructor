import React, { FC } from 'react';

import { css } from '@emotion/css';
import dndLineImg from 'src/img/dnd-line.svg';
import { DropLineProps } from './types';

export const DropLine: FC<DropLineProps> = ({
  children,
  isOver,
  widgetsLength,
  widgetName,
  widgetIndex,
  dragItemWidgetName,
  dragItemWidgetIndex,
}) => {
  if (dragItemWidgetName === null || dragItemWidgetIndex === null)
    return <>{children}</>;
  return (
    <>
      {isOver && widgetsLength <= 3 && widgetIndex === 1 ? (
        <span
          className={css`
            display: none;
            position: absolute;
            top: -4px;
            width: 100%;
            height: 6px;
            background-repeat: no-repeat;
            background-size: 100%;
            background-image: url(${dndLineImg});

            ${isOver && dragItemWidgetName !== widgetName
              ? 'display: block;'
              : null};
          `}
        ></span>
      ) : null}

      {isOver && widgetsLength === 3 && widgetIndex === 2 ? (
        <span
          className={css`
            display: none;
            position: absolute;
            top: -4px;
            width: 100%;
            height: 6px;
            background-repeat: no-repeat;
            background-size: 100%;
            background-image: url(${dndLineImg});

            ${isOver && dragItemWidgetName !== widgetName
              ? 'display: block;'
              : null};
          `}
        ></span>
      ) : null}
      {/* The general case */}
      {isOver &&
      widgetsLength === 4 &&
      dragItemWidgetIndex === 2 &&
      widgetIndex === 1 ? (
        <span
          className={css`
            display: none;
            position: absolute;
            top: -4px;
            width: 100%;
            height: 6px;
            background-repeat: no-repeat;
            background-size: 100%;
            background-image: url(${dndLineImg});

            ${isOver && dragItemWidgetName !== widgetName
              ? 'display: block;'
              : null};
          `}
        ></span>
      ) : null}
      {isOver &&
      widgetsLength === 4 &&
      dragItemWidgetIndex === 3 &&
      widgetIndex === 1 ? (
        <span
          className={css`
            display: none;
            position: absolute;
            top: -4px;
            width: 100%;
            height: 6px;
            background-repeat: no-repeat;
            background-size: 100%;
            background-image: url(${dndLineImg});

            ${isOver && dragItemWidgetName !== widgetName
              ? 'display: block;'
              : null};
          `}
        ></span>
      ) : null}
      {isOver &&
      widgetsLength === 4 &&
      dragItemWidgetIndex === 3 &&
      widgetIndex === 2 ? (
        <span
          className={css`
            display: none;
            position: absolute;
            top: -4px;
            width: 100%;
            height: 6px;
            background-repeat: no-repeat;
            background-size: 100%;
            background-image: url(${dndLineImg});

            ${isOver && dragItemWidgetName !== widgetName
              ? 'display: block;'
              : null};
          `}
        ></span>
      ) : null}

      {children}

      {isOver && widgetsLength === 1 ? (
        <span
          className={css`
            display: none;
            position: absolute;
            bottom: -2px;
            width: 100%;
            height: 6px;
            background-repeat: no-repeat;
            background-size: 100%;
            background-image: url(${dndLineImg});

            ${isOver && dragItemWidgetName !== widgetName
              ? 'display: block;'
              : null};
          `}
        ></span>
      ) : null}

      {isOver &&
      widgetsLength === 4 &&
      dragItemWidgetIndex === 2 &&
      widgetIndex === 0 ? (
        <span
          className={css`
            display: none;
            position: absolute;
            bottom: -2px;
            width: 100%;
            height: 6px;
            background-repeat: no-repeat;
            background-size: 100%;
            background-image: url(${dndLineImg});

            ${isOver && dragItemWidgetName !== widgetName
              ? 'display: block;'
              : null};
          `}
        ></span>
      ) : null}
      {isOver &&
      widgetsLength === 4 &&
      dragItemWidgetIndex === 2 &&
      widgetIndex === 3 ? (
        <span
          className={css`
            display: none;
            position: absolute;
            bottom: -2px;
            width: 100%;
            height: 6px;
            background-repeat: no-repeat;
            background-size: 100%;
            background-image: url(${dndLineImg});

            ${isOver && dragItemWidgetName !== widgetName
              ? 'display: block;'
              : null};
          `}
        ></span>
      ) : null}
      {isOver &&
      widgetsLength === 4 &&
      dragItemWidgetIndex === 1 &&
      widgetIndex === 2 ? (
        <span
          className={css`
            display: none;
            position: absolute;
            bottom: -2px;
            width: 100%;
            height: 6px;
            background-repeat: no-repeat;
            background-size: 100%;
            background-image: url(${dndLineImg});

            ${isOver && dragItemWidgetName !== widgetName
              ? 'display: block;'
              : null};
          `}
        ></span>
      ) : null}
      {isOver &&
      widgetsLength === 4 &&
      dragItemWidgetIndex === 1 &&
      widgetIndex === 3 ? (
        <span
          className={css`
            display: none;
            position: absolute;
            bottom: -2px;
            width: 100%;
            height: 6px;
            background-repeat: no-repeat;
            background-size: 100%;
            background-image: url(${dndLineImg});

            ${isOver && dragItemWidgetName !== widgetName
              ? 'display: block;'
              : null};
          `}
        ></span>
      ) : null}
    </>
  );
};
