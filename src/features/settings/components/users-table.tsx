"use client"

import { createContext, useContext, useEffect, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import type { ColumnDef } from '@tanstack/react-table'
import { toast } from 'sonner'
import { UserPlus, Check, Minus, MoreVertical, Pencil, Trash2, Loader2 } from 'lucide-react'
import { DataTable } from '@/components/tables/data-table'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { StatusBadge } from '@/components/shared/status-badge'
import { ConfirmDialog } from '@/components/shared/confirm-dialog'
import { TextField, SelectField } from '@/components/forms'
import { teamRoleMap, customerStatusMap } from '@/constants/status-maps'
import { formatRelativeDate } from '@/lib/utils'
import { mockTeamMembers, mockPermissions } from '@/features/settings/mock-data'
import type { TeamMember } from '@/types/settings'

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

const ROLE_OPTIONS = [
  { label: 'Admin', value: 'admin' },
  { label: 'Manager', value: 'manager' },
  { label: 'Support', value: 'support' },
]

const STATUS_OPTIONS = [
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
]

// Context for action callbacks
interface UserActionCallbacks {
  onEdit?: (member: TeamMember) => void
  onDelete?: (member: TeamMember) => void
}

const UserActionsContext = createContext<UserActionCallbacks>({})

function TeamMemberActions({ member }: { member: TeamMember }) {
  const { onEdit, onDelete } = useContext(UserActionsContext)
  const [open, setOpen] = useState(false)

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-md h-8 w-8 p-0 hover:bg-accent hover:text-accent-foreground transition-colors focus-visible:outline-none">
        <MoreVertical className="h-4 w-4 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          closeOnClick
          onClick={() => { setOpen(false); setTimeout(() => onEdit?.(member), 0) }}
        >
          <Pencil className="h-4 w-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          closeOnClick
          onClick={() => { setOpen(false); setTimeout(() => onDelete?.(member), 0) }}
        >
          <Trash2 className="h-4 w-4" />
          Remove
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const teamColumns: ColumnDef<TeamMember>[] = [
  {
    id: 'member',
    accessorKey: 'name',
    header: 'Member',
    cell: ({ row }) => {
      const member = row.original
      return (
        <div className="flex items-center gap-3">
          <Avatar>
            {member.avatar && <AvatarImage src={member.avatar} alt={member.name} />}
            <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{member.name}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{member.email}</p>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => {
      const role = teamRoleMap[row.original.role]
      return <StatusBadge label={role.label} variant={role.variant} />
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = customerStatusMap[row.original.status]
      return <StatusBadge label={status.label} variant={status.variant} />
    },
  },
  {
    accessorKey: 'lastActiveAt',
    header: 'Last Active',
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {formatRelativeDate(row.original.lastActiveAt)}
      </span>
    ),
  },
  {
    id: 'actions',
    header: 'Action',
    enableHiding: false,
    cell: ({ row }) => <TeamMemberActions member={row.original} />,
  },
]

// Edit User Dialog
interface EditFormData {
  name: string
  email: string
  role: string
  status: string
}

function EditUserDialog({
  open,
  onOpenChange,
  member,
  onSave,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  member: TeamMember | null
  onSave: (id: string, data: EditFormData) => void
}) {
  const methods = useForm<EditFormData>({
    defaultValues: { name: '', email: '', role: '', status: 'active' },
  })

  const { watch, formState: { isSubmitting }, reset } = methods
  const nameValue = watch('name')
  const emailValue = watch('email')
  const roleValue = watch('role')

  const isFormValid = nameValue?.length >= 2 && !!emailValue && !!roleValue

  useEffect(() => {
    if (open && member) {
      reset({
        name: member.name,
        email: member.email,
        role: member.role,
        status: member.status,
      })
    }
  }, [open, member, reset])

  const onSubmit = async (data: EditFormData) => {
    await new Promise((r) => setTimeout(r, 500))
    if (member) onSave(member.id, data)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Team Member</DialogTitle>
        </DialogHeader>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
            <TextField name="name" label="Full Name" placeholder="Jane Doe" required />
            <TextField name="email" label="Email Address" placeholder="jane@mystore.com" type="email" required />
            <SelectField name="role" label="Role" options={ROLE_OPTIONS} placeholder="Select role" required />
            <SelectField name="status" label="Status" options={STATUS_OPTIONS} />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting || !isFormValid}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  )
}

// Invite User Dialog
interface InviteFormData {
  name: string
  email: string
  role: string
}

function InviteUserDialog() {
  const [open, setOpen] = useState(false)

  const methods = useForm<InviteFormData>({
    defaultValues: { name: '', email: '', role: '' },
  })

  const { watch, formState: { isSubmitting }, reset } = methods
  const nameValue = watch('name')
  const emailValue = watch('email')
  const roleValue = watch('role')

  const isFormValid = nameValue?.length >= 2 && !!emailValue && !!roleValue

  const handleOpen = () => {
    reset({ name: '', email: '', role: '' })
    setOpen(true)
  }

  const onSubmit = async (_data: InviteFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    toast.success('Invitation sent')
    reset()
    setOpen(false)
  }

  return (
    <>
      <Button onClick={handleOpen}>
        <UserPlus className="mr-2 h-4 w-4" />
        Invite User
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite Team Member</DialogTitle>
          </DialogHeader>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
              <TextField name="name" label="Full Name" placeholder="Jane Doe" required />
              <TextField name="email" label="Email Address" placeholder="jane@mystore.com" type="email" required />
              <SelectField name="role" label="Role" options={ROLE_OPTIONS} placeholder="Select role" required />
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting || !isFormValid}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Send Invitation
                </Button>
              </DialogFooter>
            </form>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </>
  )
}

export function UsersTable() {
  const [members, setMembers] = useState<TeamMember[]>(mockTeamMembers)
  const [editMember, setEditMember] = useState<TeamMember | null>(null)
  const [editOpen, setEditOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<TeamMember | null>(null)

  const handleEdit = (member: TeamMember) => {
    setEditMember(member)
    setEditOpen(true)
  }

  const handleSave = (id: string, data: EditFormData) => {
    setMembers((prev) =>
      prev.map((m) =>
        m.id === id
          ? { ...m, name: data.name, email: data.email, role: data.role as TeamMember['role'], status: data.status as TeamMember['status'] }
          : m
      )
    )
    toast.success(`${data.name} has been updated`)
  }

  const handleDelete = (member: TeamMember) => {
    setDeleteTarget(member)
  }

  const confirmDelete = async () => {
    if (!deleteTarget) return
    await new Promise((r) => setTimeout(r, 300))
    setMembers((prev) => prev.filter((m) => m.id !== deleteTarget.id))
    toast.success(`${deleteTarget.name} has been removed`)
    setDeleteTarget(null)
  }

  return (
    <div className="space-y-6">
      <UserActionsContext.Provider value={{ onEdit: handleEdit, onDelete: handleDelete }}>
        <Card>
          <CardContent className="p-0">
            <div className="p-4">
              <DataTable
                columns={teamColumns}
                data={members}
                searchKey="name"
                searchPlaceholder="Search team members..."
                enablePagination
                filterContent={<InviteUserDialog />}
              />
            </div>
          </CardContent>
        </Card>
      </UserActionsContext.Provider>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Role Permissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Module</TableHead>
                  <TableHead className="text-center">Admin</TableHead>
                  <TableHead className="text-center">Manager</TableHead>
                  <TableHead className="text-center">Support</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockPermissions.map((perm) => (
                  <TableRow key={perm.module}>
                    <TableCell className="font-medium">{perm.module}</TableCell>
                    <TableCell className="text-center">
                      {perm.admin ? (
                        <Check className="mx-auto h-4 w-4 text-success" />
                      ) : (
                        <Minus className="mx-auto h-4 w-4 text-muted-foreground" />
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {perm.manager ? (
                        <Check className="mx-auto h-4 w-4 text-success" />
                      ) : (
                        <Minus className="mx-auto h-4 w-4 text-muted-foreground" />
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {perm.support ? (
                        <Check className="mx-auto h-4 w-4 text-success" />
                      ) : (
                        <Minus className="mx-auto h-4 w-4 text-muted-foreground" />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <EditUserDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        member={editMember}
        onSave={handleSave}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => { if (!open) setDeleteTarget(null) }}
        title="Remove Team Member"
        description={`Are you sure you want to remove "${deleteTarget?.name}"? They will lose access to the admin panel.`}
        confirmLabel="Remove"
        variant="destructive"
        onConfirm={confirmDelete}
      />
    </div>
  )
}
