import React, { useMemo } from 'react';

import { paths } from 'src/routes/paths';

import { useTranslate } from 'src/locales';

// import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  job: icon('ic_job'),
  blog: icon('ic_blog'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  student: <Iconify icon="ph:student-bold" sx={{ width: 1, height: 1 }} />,
  employee: <Iconify icon="clarity:employee-solid" sx={{ width: 1, height: 1 }} />,
  inquiry: <Iconify icon="heroicons-solid:newspaper" sx={{ width: 1, height: 1 }} />,
  demo: <Iconify icon="material-symbols:demography-outline" sx={{ width: 1, height: 1 }} />,
  seminar: <Iconify icon="material-symbols:overview-sharp" sx={{ width: 1, height: 1 }} />,
  attandance: <Iconify icon="fluent:clipboard-task-list-20-filled" sx={{ width: 1, height: 1 }} />,
  expenses: <Iconify icon="arcticons:day-to-day-expenses" sx={{ width: 1, height: 1 }} />,
  task: <Iconify icon="fluent:task-list-square-person-20-filled" sx={{ width: 1, height: 1 }} />,
  visit: <Iconify icon="material-symbols:nest-doorbell-visitor" sx={{ width: 1, height: 1 }} />,
  exam: <Iconify icon="healthicons:i-exam-multiple-choice-negative" sx={{ width: 1, height: 1 }} />,
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  tour: icon('ic_tour'),
  order: icon('ic_order'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  product: icon('ic_product'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
  batches: <Iconify icon="mdi:google-classroom" sx={{ width: 1, height: 1 }} />,
};

// ----------------------------------------------------------------------

export function useNavData() {
  const { t } = useTranslate();
  const data = useMemo(
    () => [
      // OVERVIEW
      // ----------------------------------------------------------------------
      {
        subheader: t('overview'),
        items: [
          {
            title: t('dashboard'),
            path: paths.dashboard.root,
            icon: ICONS.dashboard,
          },
          // {
          //   title: t('ecommerce'),
          //   path: paths.dashboard.general.ecommerce,
          //   icon: ICONS.ecommerce,
          // },
          // {
          //   title: t('analytics'),
          //   path: paths.dashboard.general.analytics,
          //   icon: ICONS.analytics,
          // },
          // {
          //   title: t('banking'),
          //   path: paths.dashboard.general.banking,
          //   icon: ICONS.banking,
          // },
          // {
          //   title: t('booking'),
          //   path: paths.dashboard.general.booking,
          //   icon: ICONS.booking,
          // },
        ],
      },

      // MANAGEMENT
      // ----------------------------------------------------------------------
      {
        subheader: t('management'),
        items: [
          // STUDENT
          {
            title: t('student'),
            path: paths.dashboard.student.list,
            icon: ICONS.student,
          },

          // ACCOUNT
          {
            title: t('account'),
            path: paths.dashboard.account.root,
            icon: ICONS.user,
          },

          // FEES
          {
            title: t('fees'),
            path: paths.dashboard.general.fees,
            icon: ICONS.invoice,
          },

          // COMPLAIN
          {
            title: t('Complaints'),
            path: paths.dashboard.general.complain,
            icon: ICONS.file,
          },

          // EMPLOYEE
          {
            title: t('employee'),
            path: paths.dashboard.employee.list,
            icon: ICONS.employee,
          },

          // INQUIRY
          {
            title: t('inquiry'),
            path: paths.dashboard.inquiry.list,
            icon: ICONS.inquiry,
          },
          // PRODUCT
          // {
          //   title: t('product'),
          //   path: paths.dashboard.product.root,
          //   icon: ICONS.product,
          //   children: [
          //     { title: t('list'), path: paths.dashboard.product.root },
          //     {
          //       title: t('details'),
          //       path: paths.dashboard.product.demo.details,
          //     },
          //     { title: t('create'), path: paths.dashboard.product.new },
          //     { title: t('edit'), path: paths.dashboard.product.demo.edit },
          //   ],
          // },

          // ORDER
          // {
          //   title: t('order'),
          //   path: paths.dashboard.order.root,
          //   icon: ICONS.order,
          //   children: [
          //     { title: t('list'), path: paths.dashboard.order.root },
          //     { title: t('details'), path: paths.dashboard.order.demo.details },
          //   ],
          // },

          // DEMO
          {
            title: t('Demo'),
            path: paths.dashboard.demo.root,
            icon: ICONS.demo,
          },

          // SEMINAR
          {
            title: t('seminar'),
            path: paths.dashboard.seminar.list,
            icon: ICONS.seminar,
          },

          // ATTENDANCE
          {
            title: t('attendance'),
            path: paths.dashboard.attendance.root,
            icon: ICONS.attandance,
          },

          // EXPENSES
          {
            title: t('expenses'),
            path: paths.dashboard.expenses.list,
            icon: ICONS.expenses,
            // children: [{ title: t('list'), path: paths.dashboard.expenses.list }],
          },
          // TASK
          {
            title: t('task'),
            path: paths.dashboard.task.list,
            icon: ICONS.task,
            // children: [{ title: t('list'), path: paths.dashboard.expenses.list }],
          },
          {
            title: t('visit'),
            path: paths.dashboard.visit.list,
            icon: ICONS.visit,
            // children: [{ title: t('list'), path: paths.dashboard.expenses.list }],
          },

          {
            title: t('exam'),
            path: paths.dashboard.examination.list,
            icon: ICONS.exam,
            // children: [{ title: t('list'), path: paths.dashboard.expenses.list }],
          },

          // BATCH
          {
            title: t('batches'),
            path: paths.dashboard.batches.root,
            icon: ICONS.batches,
            // children: [
            // { title: t('list'), path: paths.dashboard.batches.root },
            // { title: t('details'), path: paths.dashboard.batches.demo.details },
            // ],
          },

          // INVOICE
          // {
          //   title: t('invoice'),
          //   path: paths.dashboard.invoice.root,
          //   icon: ICONS.invoice,
          //   children: [
          //     { title: t('list'), path: paths.dashboard.invoice.root },
          //     {
          //       title: t('details'),
          //       path: paths.dashboard.invoice.demo.details,
          //     },
          //     { title: t('create'), path: paths.dashboard.invoice.new },
          //     { title: t('edit'), path: paths.dashboard.invoice.demo.edit },
          //   ],
          // },

          // CALENDAR
          {
            title: t('calendar'),
            path: paths.dashboard.calendar,
            icon: ICONS.calendar,
          },

          // // KANBAN
          // {
          //   title: t('kanban'),
          //   path: paths.dashboard.kanban,
          //   icon: ICONS.kanban,
          // },
        ],
      },
    ],
    [t]
  );

  return data;
}
